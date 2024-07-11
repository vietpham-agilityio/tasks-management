import { notFound } from 'next/navigation';

// APIs
import { getPartipationsByProjectId, getProjectById } from '@/api';

// Components
import { AvatarGroup, ErrorMessage } from '@/components';
import { AddNewMember } from '../AddNewMember';

// Constants
import { DATE_FORMAT } from '@/constants';

// Icons
import { FaLock, FaLockOpen } from 'react-icons/fa';

// Utils
import { formatDate } from '@/utils';

type ProjectHeaderProps = {
  projectId: string;
};

export const ProjectHeader = async ({ projectId }: ProjectHeaderProps) => {
  // TODO: Get Project Detail, Get Members
  const { data: projectData, error: projectError } =
    await getProjectById(projectId);
  const { data: participationData, error: participationError } =
    await getPartipationsByProjectId(projectId);

  const error = projectError || participationError;

  if (!projectData) {
    notFound();
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="grid grid-rows-1 lg:grid-cols-5 px-[29px] py-12 bg-zinc-100 dark:bg-neutral-700 rounded-lg items-center lg:place-items-center gap-4 ">
      <span className="font-bold text-2xl dark:text-white">
        {projectData.title}
      </span>
      <div className="lg:col-span-2 flex flex-row gap-[22px]">
        <AvatarGroup listUsers={participationData} maxDisplayed={3} />
        <AddNewMember />
      </div>
      <div className="font-bold text-base  dark:text-white dark:fill-white">
        {projectData.isPublic ? (
          <span className="flex flex-rows gap-4">
            <FaLockOpen className="w-5 h-5" />
            Public
          </span>
        ) : (
          <span className="flex flex-rows gap-4">
            <FaLock className="w-5 h-5" />
            Private
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 dark:text-white">
        <span>Created</span>
        <time className="font-bold text-lg">
          {formatDate(projectData.createdAt, DATE_FORMAT.Secondary)}
        </time>
      </div>
    </div>
  );
};
