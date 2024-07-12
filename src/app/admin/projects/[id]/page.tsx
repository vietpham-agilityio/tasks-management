// APIs
import { getProjectById } from '@/api';

// Components
import { ProjectHeader, TaskSection } from '@/ui';
import { ErrorMessage, ItemNotFound } from '@/components';

// Constants
import { TASK_STATUS_OPTIONS } from '@/constants';

const ProjectDetailPage = async ({ params }: { params: { id: string } }) => {
  const projectId = params.id;
  const { data: projectData, error: projectError } =
    await getProjectById(projectId);

  if (!projectData) {
    return (
      <ItemNotFound
        title="Project Not Found"
        description="Please create new projects or stay tuned for updates"
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
      <ProjectHeader projectId={projectId} />
      <div className="grid grid-rows-1 md:grid-cols-3 gap-6 pt-5 divide-y-2 md:divide-y-0">
        {TASK_STATUS_OPTIONS.map((section) => (
          <TaskSection
            key={`section-${section.name}`}
            projectId={projectId}
            title={section.name}
            value={section.value}
          />
        ))}
      </div>
    </main>
  );
};

export default ProjectDetailPage;
