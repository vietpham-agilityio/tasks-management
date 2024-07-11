// Components
import { ProjectActionBar, ProjectHeader, TaskSection } from '@/ui';

// Constants
import { TASK_STATUS_OPTIONS } from '@/constants';

const ProjectDetailPage = ({ params }: { params: { id: string } }) => {
  const projectId = params.id;

  return (
    <main className="grid grid-flow-row gap-3">
      <h1 className="font-bold text-3xl dark:text-white pb-[43px] pt-5">
        Project Board
      </h1>
      <ProjectHeader projectId={projectId} />
      <ProjectActionBar projectId={projectId} />
      <div className="grid grid-rows-1 md:grid-cols-3 gap-6 pt-5 divide-y-2 lg:divide-y-0">
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
