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
  try {
    return await withAuth<
      {
        projectId: string;
        cacheOptions?: CacheOption;
      },
      ResponseStateType<Participation[]>
    >(
      async (args, session) => {
        return session
          ? await queryParticipationsByProjectId(args.projectId)
          : await cache(
              queryParticipationsByProjectId,
              [
                TAGS.PROJECT_DETAIL(args.projectId),
                ...(args.cacheOptions?.keyParts || []),
              ],
              args.cacheOptions?.options,
            )(args.projectId);
      },
      { projectId, cacheOptions },
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
