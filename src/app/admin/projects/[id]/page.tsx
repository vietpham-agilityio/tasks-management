// Components
import { ProjectActionBar, ProjectHeader, TaskSection } from '@/ui';

// Constants
import { TASK_STATUS_OPTIONS } from '@/constants';

const ProjectDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="grid grid-flow-row gap-3">
      <h1 className="font-bold text-3xl dark:text-white pb-[43px] pt-5">
        Project Board
      </h1>
      <ProjectHeader />
      <ProjectActionBar projectId={params.id} />
      <div className="grid grid-rows-1 md:grid-cols-3 gap-6 pt-5">
        {TASK_STATUS_OPTIONS.map((section) => (
          <TaskSection
            key={`section-${section.name}`}
            title={section.name}
            value={section.value}
          />
        ))}
      </div>
    </main>
  );
};

export default ProjectDetailPage;
