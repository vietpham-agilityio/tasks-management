'use server';

import { doc, writeBatch } from 'firebase/firestore';

// Configs
import { db } from '@/config';

// Constants
import { COLLECTION, ERROR_MESSAGES } from '@/constants';

// Models
import { ResponseStateType } from '@/models';

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
