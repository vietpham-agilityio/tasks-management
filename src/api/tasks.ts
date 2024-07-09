import { unstable_cache as cache } from 'next/cache';

// DB
import { getDocuments, countTaskByType } from '@/db';

// Constants
import { COLLECTION, TAGS } from '@/constants';

// Types
import {
  CacheOption,
  QueryParam,
  ResponseStateType,
  Task,
  TaskStatQueryParam,
  TaskStatResponse,
} from '@/models';

// HOCs
import { withAuth } from '@/hocs';

export const getTasks = async (
  queryParam?: QueryParam<Task>,
): Promise<ResponseStateType<Task[]>> => {
  // TODO: Get project by userId in admin pages
  return await withAuth<
    {
      queryParam?: QueryParam<Task>;
    },
    ResponseStateType<Task[]>
  >(
    async (args, session) => {
      const tasks = session
        ? await getDocuments(COLLECTION.TASKS, args.queryParam)
        : await cache(getDocuments, [TAGS.TASK_LIST], {
            tags: [TAGS.TASK_LIST],
          })<Task>(COLLECTION.TASKS, args.queryParam);

      return tasks;
    },
    { queryParam },
    false,
  );
};

export const getTaskStatistic = async (
  stats: TaskStatQueryParam[],
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<TaskStatResponse[]>> => {
  return await withAuth<
    {
      stats: { field: string; value: string }[];
      cacheOptions?: CacheOption;
    },
    ResponseStateType<TaskStatResponse[]>
  >(
    async (args, session) => {
      try {
        const taskStat: TaskStatResponse[] = [];
        await Promise.all(
          args.stats.map(async (type) => {
            const response = session?.user?.id
              ? await countTaskByType(type.field, type.value, session?.user?.id)
              : await cache(
                  countTaskByType,
                  [TAGS.TASK_LIST, ...(args.cacheOptions?.keyParts || [])],
                  args.cacheOptions?.options,
                )(type.field, type.value);
            if (response.data && response.total) {
              taskStat.push({
                label: response.data,
                total: response.total,
              });
            }
          }),
        );
        return {
          success: true,
          data: taskStat,
        };
      } catch (error) {
        return {
          success: false,
          error: (error as Error).message,
        };
      }
    },
    { stats, cacheOptions },
    false,
  );
};
