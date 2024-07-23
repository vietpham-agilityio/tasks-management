import { unstable_cache as cache } from 'next/cache';
import { documentId } from 'firebase/firestore';

// DB
import {
  getDocuments,
  getProjectDetail,
  getProjectDetailBySlug,
  queryAssignedProjectsByUserId,
} from '@/db';

// Constants
import { COLLECTION, QUERY_PARAMS, TAGS } from '@/constants';

// Models
import { CacheOption, Project, ResponseStateType } from '@/models';
import { QueryFilter, QueryParam } from '@/types';

// HOCs
import { withAuth } from '@/hocs';

export const getProjectList = async (
  queryParam?: QueryParam,
): Promise<ResponseStateType<Project[]>> => {
  try {
    return await withAuth<
      {
        queryParam?: QueryParam;
      },
      ResponseStateType<Project[]>
    >(
      async (args, session) => {
        if (session) {
          const updateQueryParam = { ...args.queryParam };
          if (updateQueryParam && updateQueryParam.query) {
            let filterByUserIndex = -1;
            filterByUserIndex = updateQueryParam.query.findIndex(
              (filter: QueryFilter) =>
                filter.field === QUERY_PARAMS.FILTER_BY_USER,
            );
            // If filter by user exists -> Query all projects user is a part of
            if (filterByUserIndex != -1) {
              const response = await queryAssignedProjectsByUserId(
                session.user.id,
              );
              if (response.data.length !== 0) {
                updateQueryParam.query[filterByUserIndex] = {
                  field: documentId(),
                  comparison: 'in',
                  value: response.data.map(
                    (participation) => participation.projectId,
                  ),
                };
              }
              // Remove filter param (filter by user)
              // Query as usual
              else {
                updateQueryParam.query = updateQueryParam.query.filter(
                  (_, index) => index !== filterByUserIndex,
                );
              }
            }
          }
          return await getDocuments<Project>(
            COLLECTION.PROJECTS,
            updateQueryParam,
          );
        }
        return await cache(getDocuments, [TAGS.PROJECT_LIST], {
          tags: [TAGS.PROJECT_LIST],
        })<Project>(COLLECTION.PROJECTS, args.queryParam);
      },
      { queryParam },
      false,
    );
  } catch (error) {
    return {
      success: false,
      data: [],
      error: (error as Error).message,
    };
  }
};

export const getProjectById = async (
  id: string,
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<Project | null>> => {
  try {
    return await withAuth<
      {
        id: string;
        cacheOptions?: CacheOption;
      },
      ResponseStateType<Project | null>
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
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
    };
  }
};

export const getProjectBySlug = async (
  slug: string,
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<Project | null>> => {
  return await cache(
    getProjectDetailBySlug,
    [TAGS.PROJECT_DETAIL(slug), ...(cacheOptions?.keyParts || [])],
    cacheOptions?.options,
  )(slug);
};
