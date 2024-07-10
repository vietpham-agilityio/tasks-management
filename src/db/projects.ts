'use server';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

// Configs
import { db } from '@/config';

// Constants
import { COLLECTION, ERROR_MESSAGES } from '@/constants';

// Models
import { Project, ProjectFormType, ResponseStateType } from '@/models';
import { getDocument } from './query';

export async function createProject(
  values: Omit<Project, 'id'>,
): Promise<ResponseStateType<Project | null>> {
  try {
    const projectRef = await addDoc(
      collection(db, COLLECTION.PROJECTS),
      values,
    );
    return {
      success: true,
      data: {
        ...values,
        id: projectRef.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.UPSERTING_DATA_ERROR('Project'),
    };
  }
}

export async function deleteProject(
  projectId: string,
): Promise<ResponseStateType<{ projectId: string } | null>> {
  try {
    await deleteDoc(doc(db, COLLECTION.PROJECTS, projectId));
    return {
      success: true,
      data: {
        projectId,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.REMOVING_DATA_ERROR('Project', projectId),
    };
  }
}

export async function updateProject(
  id: string,
  values: Omit<ProjectFormType, 'members'> & { updatedAt: string },
): Promise<ResponseStateType<Project | null>> {
  try {
    // Get data from db
    const queryData = await getDocument<Project>(COLLECTION.PROJECTS, id);
    if (queryData?.data) {
      const data: Project = {
        ...queryData.data,
        ...values,
      };
      await updateDoc(doc(db, COLLECTION.PROJECTS, id), data);
      return {
        data,
        success: true,
      };
    } else {
      return {
        success: false,
        data: null,
        error: ERROR_MESSAGES.DATA_NOT_FOUND,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.UPSERTING_DATA_ERROR('Project'),
    };
  }
}

export async function getProjectDetail(
  id: string,
): Promise<ResponseStateType<Project | null>> {
  try {
    const response = await getDocument<Project>(COLLECTION.PROJECTS, id);
    if (response?.data) {
      return {
        ...response,
        success: true,
      };
    }
    return {
      ...response,
      data: null,
      success: false,
      error: ERROR_MESSAGES.DATA_NOT_FOUND,
    };
  } catch (error) {
    return { success: false, data: null, error: (error as Error).message };
  }
}
