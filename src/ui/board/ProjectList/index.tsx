// Auth
import { auth } from '@/auth';

// Components
import { OverviewCard } from '@/components';

// Constants
import { MOCK_PROJECT_LIST, ROUTES } from '@/constants';

const ProjectList = async () => {
  const session = await auth();
  const data = MOCK_PROJECT_LIST;

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
      <span className="text-xl font-bold dark:text-white">My Project</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-3 gap-6 ">
        {data.map((project) => {
          return (
            <OverviewCard
              key={project.id}
              href={
                session
                  ? ROUTES.ADMIN_PROJECT_DETAIL(project.id)
                  : ROUTES.PROJECT_DETAIL(project.slug)
              }
              title={project.title}
              description={project.description}
              isRowDisplay={true}
              customClass={{
                wrapper: 'hover:bg-zinc-100',
                image: 'md:aspect-square md:max-w-16',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export { ProjectList };
