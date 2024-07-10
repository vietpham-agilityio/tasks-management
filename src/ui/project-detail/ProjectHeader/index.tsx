// Components
import { AvatarGroup } from '@/components';
import { AddNewMember } from '../AddNewMember';

// Constants
import {
  DATE_FORMAT,
  MOCK_PARTICIPATIONS,
  MOCK_PROJECT_DATA,
} from '@/constants';

// Icons
import { FaLock, FaLockOpen } from 'react-icons/fa';

// Utils
import { formatDate } from '@/utils';

// type ProjectHeaderProps = {
//   projectId: string;
// };

export const ProjectHeader = () => {
  // TODO: Get Project Detail, Get Members
  const data = MOCK_PROJECT_DATA;

  return (
    <div className="grid grid-rows-1 lg:grid-cols-5 px-[29px] py-12 bg-zinc-100 dark:bg-neutral-700 rounded-lg items-center lg:place-items-center gap-4 ">
      <span className="font-bold text-2xl dark:text-white">{data.title}</span>
      <div className="lg:col-span-2 flex flex-row gap-[22px]">
        <AvatarGroup listUsers={MOCK_PARTICIPATIONS} maxDisplayed={3} />
        <AddNewMember />
      </div>
      <div className="font-bold text-base flex flex-rows gap-4 dark:text-white dark:fill-white">
        {data.isPublic ? (
          <span>
            <FaLockOpen className="w-5 h-5" />
            Public
          </span>
        ) : (
          <span>
            <FaLock className="w-5 h-5" />
            Private
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 dark:text-white">
        <span>Created</span>
        <time className="font-bold text-lg">
          {formatDate(data.createdAt, DATE_FORMAT.Secondary)}
        </time>
      </div>
    </div>
  );
};
