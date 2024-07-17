'use server';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

// DB
import { getDocument, getDocuments } from './query';

// Configs
import { db } from '@/config';

// Constants
import {
  COLLECTION,
  ERROR_MESSAGES,
  LIMIT_ITEMS,
  QUERY_PARAMS,
} from '@/constants';

// Models
import { Project, ProjectFormType, ResponseStateType, Task } from '@/models';

export const createProject = async (
  values: Omit<Project, 'id'>,
): Promise<ResponseStateType<Project | null>> => {
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
};

export const deleteProject = async (
  projectId: string,
): Promise<ResponseStateType<{ projectId: string } | null>> => {
  try {
    const project = await getDocument<Project>(COLLECTION.PROJECTS, projectId);
    if (project.data) {
      await deleteDoc(doc(db, COLLECTION.PROJECTS, projectId));
      return {
        success: true,
        data: {
          projectId,
        },
      };
    }
    throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
};

export const updateProject = async (
  id: string,
  values: Omit<ProjectFormType, 'memberIds'> & {
    updatedAt: string;
  },
): Promise<ResponseStateType<Project | null>> => {
  try {
    // Get data from db
    const project = await getDocument<Project>(COLLECTION.PROJECTS, id);
    if (project.data) {
      if (project.data.isArchived) {
        throw new Error(ERROR_MESSAGES.PROJECT_IS_ARCHIVED);
      }
      const data: Project = {
        ...project.data,
        ...values,
      };
      await updateDoc(doc(db, COLLECTION.PROJECTS, id), data);
      return {
        data,
        success: true,
      };
    }
    throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
};

export const getProjectDetail = async (
  id: string,
): Promise<ResponseStateType<Project | null>> => {
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
};

export const getProjectDetailBySlug = async (
  slug: string,
): Promise<ResponseStateType<Project | null>> => {
  const response = await getDocuments<Project>(COLLECTION.PROJECTS, {
    query: [
      {
        field: QUERY_PARAMS.SLUG,
        comparison: '==',
        value: slug,
      },
    ],
    limitItem: LIMIT_ITEMS.SINGLE_RECORD,
  });
  if (response.data.length !== 0) {
    return {
      success: true,
      data: response.data[0],
    };
  }
  return {
    success: false,
    data: null,
    error: ERROR_MESSAGES.DATA_NOT_FOUND,
  };
};

export const getProjectDetailByTagId = async (
  id: string,
): Promise<ResponseStateType<Project | null>> => {
  const response = await getDocument<Task>(COLLECTION.TASKS, id);
  if (response.data) {
    return await getProjectDetail(response.data.projectId);
  }
  return {
    success: false,
    data: null,
    error: ERROR_MESSAGES.DATA_NOT_FOUND,
  };
};
