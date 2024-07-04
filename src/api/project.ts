import { unstable_cache as cache } from 'next/cache';

// DB
import { getDataFromFirestore } from '@/db';

// Constants
import { COLLECTION, LIMIT_ITEMS, TAGS } from '@/constants';

// Types
import { Project } from '@/models';

export const getProjects = async () => {
  const projects = await cache(getDataFromFirestore, [TAGS.PROJECT_LIST], {
    tags: [TAGS.PROJECT_LIST],
  })<Project>(COLLECTION.PROJECTS, LIMIT_ITEMS);

  return projects;
};
