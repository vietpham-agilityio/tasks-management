import { unstable_cache as cache } from 'next/cache';

// DB
import { getDocuments, getProjectDetail } from '@/db';

// Constants
import { COLLECTION, TAGS } from '@/constants';

// Models
import { CacheOption, Project, ResponseStateType } from '@/models';

export const getProjects = async () => {
  const projects = await cache(getDocuments, [TAGS.PROJECT_LIST], {
    tags: [TAGS.PROJECT_LIST],
  })<Project>(COLLECTION.PROJECTS, {
    orderItem: { field: 'updatedAt', type: 'desc' },
    limitItem: 10,
  });

  return projects;
};

export const getProjectById = async (
  id: string,
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<Project>> => {
  return await cache(
    getProjectDetail,
    [TAGS.PROJECT_DETAIL(id), ...(cacheOptions?.keyParts || [])],
    cacheOptions?.options,
  )(id);
};
