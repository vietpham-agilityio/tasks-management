'use server';

import { doc, writeBatch } from 'firebase/firestore';

// Configs
import { db } from '@/config';

// Constants
import { COLLECTION, ERROR_MESSAGES, QUERY_PARAMS } from '@/constants';

// Models
import { Participation, ResponseStateType } from '@/models';

// Query
import { getDocuments } from './query';

export async function assignUsersToProject(
  participants: string[],
  projectId: string,
  rollbackFunction?: (id: string) => Promise<unknown>,
  isProjectRecentlyCreated = false,
): Promise<ResponseStateType<string[]>> {
  try {
    const batch = writeBatch(db);
    participants.forEach((userId: string) => {
      batch.set(doc(db, COLLECTION.PARTICIPATIONS, `${userId}-${projectId}`), {
        userId: userId,
        projectId: projectId,
        createdAt: new Date().toISOString(),
        isArchived: false,
      });
    });
    await batch.commit();
    return {
      success: true,
      data: participants,
    };
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
}

export async function removeUsersFromProject(
  participants: string[],
  projectId: string,
  rollbackFunction?: (id: string) => Promise<unknown>,
  isProjectRecentlyCreated = false,
): Promise<ResponseStateType<string[]>> {
  try {
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
}

export async function queryParticipationsByProjectId(
  projectId: string,
): Promise<ResponseStateType<Participation[]>> {
  try {
    const response = await getDocuments<Participation>(
      COLLECTION.PARTICIPATIONS,
      {
        query: {
          field: QUERY_PARAMS.PROJECT_ID,
          comparison: '==',
          value: projectId,
        },
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
}
