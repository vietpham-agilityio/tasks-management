import { unstable_cache as cache } from 'next/cache';

// DB
import { getDocuments } from '@/db';

// Constants
import { COLLECTION, TAGS } from '@/constants';

// Types
import { Task } from '@/models';

export const getTasks = async () => {
  const tasks = await cache(getDocuments, [TAGS.TASK_LIST], {
    tags: [TAGS.TASK_LIST],
  })<Task>(COLLECTION.TASKS, {
    orderItem: { field: 'updatedAt', type: 'desc' },
    limitItem: 10,
  });

  return tasks;
};
