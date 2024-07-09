import { unstable_cache as cache } from 'next/cache';

// Constants
import { TAGS } from '@/constants';

// DB
import { queryParticipationsByProjectId } from '@/db';

// Models
import { CacheOption, Participation, ResponseStateType } from '@/models';

// HOCs
import { withAuth } from '@/hocs';

export const getPartipationsByProjectId = async (
  projectId: string,
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<Participation[]>> => {
  return await withAuth<
    {
      projectId: string;
      cacheOptions?: CacheOption;
    },
    ResponseStateType<Participation[]>
  >(
    async (args, session) => {
      const tasks = session
        ? await queryParticipationsByProjectId(args.projectId)
        : await cache(
            queryParticipationsByProjectId,
            [
              TAGS.PROJECT_DETAIL(args.projectId),
              ...(args.cacheOptions?.keyParts || []),
            ],
            args.cacheOptions?.options,
          )(args.projectId);

      return tasks;
    },
    { projectId, cacheOptions },
    false,
  );
};
