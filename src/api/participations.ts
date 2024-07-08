import { unstable_cache as cache } from 'next/cache';

// Constants
import { TAGS } from '@/constants';

// DB
import { queryParticipationsByProjectId } from '@/db';

// Models
import { CacheOption, Participation, ResponseStateType } from '@/models';

export const getPartipationsByProjectId = async (
  projectId: string,
  cacheOptions?: CacheOption,
): Promise<ResponseStateType<Participation[]>> => {
  return await cache(
    queryParticipationsByProjectId,
    [TAGS.PROJECT_DETAIL(projectId), ...(cacheOptions?.keyParts || [])],
    cacheOptions?.options,
  )(projectId);
};
