import { unstable_cache as cache } from 'next/cache';

// DB
import { getDataFromFirestore } from '@/db';

// Constants
import { COLLECTION, LIMIT_ITEMS, TAGS } from '@/constants';

// Types
import { Task } from '@/models';

export const getTasks = async () => {
  const tasks = await cache(getDataFromFirestore, [TAGS.TASK_LIST], {
    revalidate: 3600, // revalidate tasks data after 1 hour
  })<Task>(COLLECTION.TASKS, LIMIT_ITEMS);

  return tasks;
};
