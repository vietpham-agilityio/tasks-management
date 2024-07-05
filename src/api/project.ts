import { unstable_cache as cache } from 'next/cache';

// DB
import { getDocuments } from '@/db';

// Constants
import { COLLECTION, TAGS } from '@/constants';

// Types
import { Project } from '@/models';

export const getProjects = async () => {
  const projects = await cache(getDocuments, [TAGS.PROJECT_LIST], {
    tags: [TAGS.PROJECT_LIST],
  })<Project>(COLLECTION.PROJECTS, { field: 'updatedAt', type: 'desc' }, 10);

  return projects;
};
