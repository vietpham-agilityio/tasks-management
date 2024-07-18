import {
  QueryConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  query,
  where,
} from 'firebase/firestore';

// DB
import { getDocument, getDocuments, updateDocument } from './query';
import { db } from '@/config';

// Constants
import {
  COLLECTION,
  ERROR_MESSAGES,
  LIMIT_ITEMS,
  QUERY_PARAMS,
} from '@/constants';

// Models
import { Project, ResponseStateType, Task } from '@/models';

export const countTaskByType = async (
  field: string,
  value: string,
  userId?: string,
): Promise<ResponseStateType<string | null>> => {
  try {
    const queryConstraints: QueryConstraint[] = [];
    queryConstraints.push(where(field, '==', value));
    userId &&
      queryConstraints.push(where(QUERY_PARAMS.ASSIGNED_TO, '==', userId));
    const getQuery = query(
      collection(db, COLLECTION.TASKS),
      ...queryConstraints,
    );
    const getCount = await getCountFromServer(getQuery);
    return {
      success: true,
      data: value,
      total: getCount.data().count,
    };
  } catch (error) {
    return {
      success: false,
      data: value,
      total: 0,
      error: (error as Error).message,
    };
  }
};

export const createTask = async (
  data: Omit<Task, 'id'>,
): Promise<ResponseStateType<Task | null>> => {
  try {
    const project = await getDocument<Project>(
      COLLECTION.PROJECTS,
      data.projectId,
    );
    if (project.data) {
      if (project.data.isArchived) {
        throw new Error(ERROR_MESSAGES.PROJECT_IS_ARCHIVED);
      }
      const taskResponse = await addDoc(collection(db, COLLECTION.TASKS), data);
      return {
        success: true,
        data: {
          ...data,
          id: taskResponse.id,
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

export const updateTask = async (
  id: string,
  data: Task,
): Promise<ResponseStateType<Task | null>> => {
  try {
    const project = await getDocument<Project>(
      COLLECTION.PROJECTS,
      data.projectId,
    );
    if (project.data) {
      if (project.data.isArchived) {
        throw new Error(ERROR_MESSAGES.PROJECT_IS_ARCHIVED);
      }
      const task = await getDocument<Task>(COLLECTION.TASKS, id);
      if (task.data) {
        await updateDocument(COLLECTION.TASKS, data);
        return {
          data,
          success: true,
        };
      }
      throw new Error(ERROR_MESSAGES.UPSERTING_DATA_ERROR(id));
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

export const deleteTask = async (taskId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION.TASKS, taskId));
    return {
      success: true,
      data: {
        taskId,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: ERROR_MESSAGES.REMOVING_DATA_ERROR('Task', taskId),
    };
  }
};

export const getTaskDetailById = async (taskId: string) => {
  try {
    const response = await getDocument<Task>(COLLECTION.TASKS, taskId);

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

export const getTaskDetailBySlug = async (
  slug: string,
): Promise<ResponseStateType<Task | null>> => {
  const response = await getDocuments<Task>(COLLECTION.TASKS, {
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
