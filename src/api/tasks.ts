import { unstable_cache as cache } from 'next/cache';

// DB
import {
  getDocument,
  getDocuments,
  countTaskByType,
  getTaskDetailBySlug,
} from '@/db';

// Constants
import { COLLECTION, TAGS } from '@/constants';

// Types
import {
  CacheOption,
  ResponseStateType,
  Task,
  TaskStatisticQueryParam,
  TaskStatisticResponse,
} from '@/models';
import { QueryParam } from '@/types';

// HOCs
import { withAuth } from '@/hocs';

export const getTasks = async (
  queryParam?: QueryParam,
): Promise<ResponseStateType<Task[]>> => {
  try {
    return await withAuth<
      {
        queryParam?: QueryParam;
      },
      ResponseStateType<Task[]>
    >(
      async (args, session) => {
        const tasks = session
          ? await getDocuments<Task>(COLLECTION.TASKS, args.queryParam)
          : await cache(getDocuments, [TAGS.TASK_LIST], {
              tags: [TAGS.TASK_LIST],
            })<Task>(COLLECTION.TASKS, args.queryParam);

        return tasks;
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

export const getTaskStatistic = async (
  stats: TaskStatisticQueryParam[],
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<TaskStatisticResponse[]>> => {
  try {
    return await withAuth<
      {
        stats: { field: string; value: string }[];
        cacheOptions?: CacheOption;
      },
      ResponseStateType<TaskStatisticResponse[]>
    >(
      async (args, session) => {
        try {
          const taskStat: TaskStatisticResponse[] = [];
          await Promise.all(
            args.stats.map(async (type) => {
              const response = session?.user?.id
                ? await countTaskByType(
                    type.field,
                    type.value,
                    session?.user?.id,
                  )
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
            data: [],
            error: (error as Error).message,
          };
        }
      },
      { stats, cacheOptions },
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

export const getTaskById = async (id: string) => {
  try {
    return await withAuth<
      {
        id: string;
        cacheOptions?: CacheOption;
      },
      ResponseStateType<Task | null>
    >(
      async (args, session) => {
        const tasks = session
          ? await getDocument<Task>(COLLECTION.TASKS, args.id)
          : await cache(getDocument, [TAGS.TASK_DETAIL(args.id)], {
              tags: [TAGS.TASK_DETAIL(args.id)],
            })<Task>(COLLECTION.TASKS, args.id);

        return tasks;
      },
      { id },
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

export const getTaskBySlug = async (
  slug: string,
  cacheOptions?: CacheOption,
) => {
  return await cache(
    getTaskDetailBySlug,
    [TAGS.TASK_DETAIL(slug), ...(cacheOptions?.keyParts || [])],
    cacheOptions?.options,
  )(slug);
};
