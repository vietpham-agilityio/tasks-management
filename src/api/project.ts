import { unstable_cache as cache } from 'next/cache';

// DB
import { getDocuments, getProjectDetail } from '@/db';

// Constants
import { COLLECTION, TAGS } from '@/constants';

// Models
import { CacheOption, Project, QueryParam, ResponseStateType } from '@/models';

// HOCs
import { withAuth } from '@/hocs';

export const getProjects = async (
  queryParam?: QueryParam,
): Promise<ResponseStateType<Project[]>> => {
  // TODO: Get project by userId in admin pages
  return await withAuth<
    {
      queryParam?: QueryParam;
    },
    ResponseStateType<Project[]>
  >(
    async (args, session) => {
      const tasks = session
        ? await getDocuments<Project>(COLLECTION.PROJECTS, args.queryParam)
        : await cache(getDocuments, [TAGS.PROJECT_LIST], {
            tags: [TAGS.PROJECT_LIST],
          })<Project>(COLLECTION.PROJECTS, args.queryParam);

      return tasks;
    },
    { queryParam },
    false,
  );
};

export const getProjectById = async (
  id: string,
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<Project>> => {
  return await withAuth<
    {
      id: string;
      cacheOptions?: CacheOption;
    },
    ResponseStateType<Project>
  >(
    async (args, session) => {
      const tasks = session
        ? await getProjectDetail(args.id)
        : await cache(
            getProjectDetail,
            [
              TAGS.PROJECT_DETAIL(args.id),
              ...(args.cacheOptions?.keyParts || []),
            ],
            args.cacheOptions?.options,
          )(args.id);

      return tasks;
    },
    { id, cacheOptions },
    false,
  );
};
