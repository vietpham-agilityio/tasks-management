'use server';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

// Configs
import { db } from '@/config';

// Constants
import { COLLECTION, ERROR_MESSAGES } from '@/constants';

// Models
import { Project, ResponseStateType } from '@/models';

export async function createProject(
  values: Omit<Project, 'id'>,
): Promise<ResponseStateType<Project>> {
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
      error: ERROR_MESSAGES.UPSERTING_DATA_ERROR('Project'),
    };
  }
}

export async function deleteProject(
  projectId: string,
): Promise<ResponseStateType<{ projectId: string }>> {
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
      error: ERROR_MESSAGES.REMOVING_DATA_ERROR('Project', projectId),
    };
  }
}
