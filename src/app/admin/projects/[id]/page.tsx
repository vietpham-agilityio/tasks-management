import { Suspense } from 'react';
// APIs
import { getProjectById } from '@/api';

// Components
import { ProjectHeader, TaskSection } from '@/ui';
import {
  ErrorMessage,
  ItemNotFound,
  ProjectHeaderSkeleton,
  TaskSectionSkeleton,
} from '@/components';

// Constants
import { TASK_STATUS_OPTIONS } from '@/constants';
import { SearchParams } from '@/types';

const ProjectDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParams;
}) => {
  const projectId = params.id;
  const { sortBy, priority } = searchParams;

  const { data: projectData, error: projectError } =
    await getProjectById(projectId);

  if (!projectData) {
    return (
      <ItemNotFound
        title="Project Not Found"
        description="Please create a new project or stay tuned for updates"
        customClass={{
          wrapper: ' rounded-lg px-5 bg-white  py-20',
        }}
      />
    );
  }

  if (projectError) {
    return <ErrorMessage message={projectError} />;
  }

  return (
    <main className="grid grid-flow-row gap-3">
      <h1 className="font-bold text-3xl dark:text-white pb-[43px] pt-5">
        Project Board
      </h1>
      <Suspense fallback={<ProjectHeaderSkeleton />}>
        <ProjectHeader project={projectData} />
      </Suspense>
      <div className="grid grid-rows-1 md:grid-cols-3 gap-6 pt-5 divide-y-2 md:divide-y-0">
        {TASK_STATUS_OPTIONS.map(({ name, value }) => (
          <Suspense fallback={<TaskSectionSkeleton />} key={`section-${name}`}>
            <TaskSection
              key={`section-${name}`}
              projectId={projectData.id}
              sortBy={sortBy}
              priority={priority}
              title={name}
              value={value}
              isShowCreateTask={!projectData.isArchived}
            />
          </Suspense>
        ))}
      </div>
    </main>
  );
};

export default ProjectDetailPage;
