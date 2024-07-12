import { notFound } from 'next/navigation';

// APIs
import { getPartipationsByProjectId, getProjectById } from '@/api';
import { queryUserList } from '@/db';

// Components
import { AvatarGroup, ErrorMessage } from '@/components';
import { EditParticipant } from '../EditParticipant';
import { ProjectActionBar } from '../ProjectActionBar';

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
  const { data: projectData, error: projectError } =
    await getProjectById(projectId);
  const { data: participationData, error: participationError } =
    await getPartipationsByProjectId(projectId);
  const { data: userList, error: userListError } = await queryUserList();

  const error = projectError || participationError || userListError;

  if (!projectData) {
    notFound();
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="grid grid-rows-1 lg:grid-cols-5 px-[29px] py-12 bg-zinc-100 dark:bg-neutral-700 rounded-lg items-center lg:place-items-center gap-4 ">
        <span className="font-bold text-2xl dark:text-white">
          {projectData.title}
        </span>
        <div className="lg:col-span-2 flex flex-row gap-[22px]">
          <AvatarGroup listUsers={participationData} maxDisplayed={3} />
          {!projectData.isArchived && (
            <EditParticipant
              projectId={projectId}
              memberOptions={userList}
              participations={participationData.map((user) => user.userId)}
            />
          )}
        </div>
        <div className="font-bold text-base  dark:text-white dark:fill-white">
          <span className="flex flex-rows gap-4">
            {projectData.isPublic ? (
              <>
                {' '}
                <FaLockOpen className="w-5 h-5" />
                Public
              </>
            ) : (
              <>
                {' '}
                <FaLock className="w-5 h-5" />
                Private{' '}
              </>
            )}
            {projectData.isArchived && '(Archived)'}
          </span>
        </div>

        <div className="flex flex-col gap-3 dark:text-white">
          <span>Created</span>
          <time className="font-bold text-lg">
            {formatDate(projectData.createdAt, DATE_FORMAT.Secondary)}
          </time>
        </div>
      </div>
      <ProjectActionBar
        projectId={projectId}
        isArchived={projectData.isArchived}
      />
    </>
  );
};
