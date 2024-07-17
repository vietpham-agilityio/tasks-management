'use server';

import { doc, writeBatch } from 'firebase/firestore';
import { User } from 'next-auth';

// Configs
import { db } from '@/config';

// Constants
import { COLLECTION, ERROR_MESSAGES, QUERY_PARAMS } from '@/constants';

// Models
import { Participation, Project, ResponseStateType } from '@/models';

// Query
import { getDocument, getDocuments } from './query';

export const assignUsersToProject = async (
  participants: User[],
  projectId: string,
  rollbackFunction?: (id: string) => Promise<unknown>,
  isProjectRecentlyCreated = false,
): Promise<ResponseStateType<User[]>> => {
  try {
    const project = await getDocument<Project>(COLLECTION.PROJECTS, projectId);
    if (project.data) {
      if (project.data.isArchived) {
        throw new Error(ERROR_MESSAGES.PROJECT_IS_ARCHIVED);
      }
      const batch = writeBatch(db);
      participants.forEach((user) => {
        batch.set(
          doc(db, COLLECTION.PARTICIPATIONS, `${user.id}-${projectId}`),
          {
            userId: user.id,
            name: user.name,
            projectId: projectId,
            createdAt: new Date().toISOString(),
          },
        );
      });
      await batch.commit();
      return {
        success: true,
        data: participants,
      };
    }
    throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
  } catch (error) {
    isProjectRecentlyCreated &&
      rollbackFunction &&
      (await rollbackFunction(projectId));
    return {
      success: false,
      data: [],
      error: ERROR_MESSAGES.UPSERTING_DATA_ERROR('Participations'),
    };
  }
};

export const removeUsersFromProject = async (
  participants: string[],
  projectId: string,
  rollbackFunction?: (id: string) => Promise<unknown>,
  isProjectRecentlyCreated = false,
): Promise<ResponseStateType<string[]>> => {
  try {
    const project = await getDocument<Project>(COLLECTION.PROJECTS, projectId);
    if (project.data) {
      if (project.data.isArchived) {
        throw new Error(ERROR_MESSAGES.PROJECT_IS_ARCHIVED);
      }
      const batch = writeBatch(db);
      participants.forEach((userId: string) => {
        batch.delete(
          doc(db, COLLECTION.PARTICIPATIONS, `${userId}-${projectId}`),
        );
      });
      await batch.commit();
      return {
        success: true,
        data: participants,
      };
    }
    throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
  } catch (error) {
    isProjectRecentlyCreated &&
      rollbackFunction &&
      (await rollbackFunction(projectId));
    return {
      success: false,
      data: [],
      error: ERROR_MESSAGES.REMOVING_DATA_ERROR(
        'Participations',
        participants.join(','),
      ),
    };
  }
};

export const queryParticipationsByProjectId = async (
  projectId: string,
): Promise<ResponseStateType<Participation[]>> => {
  try {
    const response = await getDocuments<Participation>(
      COLLECTION.PARTICIPATIONS,
      {
        query: [
          {
            field: QUERY_PARAMS.PROJECT_ID,
            comparison: '==',
            value: projectId,
          },
        ],
      },
    );

    if (response?.data) {
      return {
        ...response,
        success: true,
      };
    }
    return {
      success: false,
      data: [],
      error: ERROR_MESSAGES.DATA_NOT_FOUND,
    };
  } catch (error) {
    return { success: false, data: [], error: (error as Error).message };
  }
};
