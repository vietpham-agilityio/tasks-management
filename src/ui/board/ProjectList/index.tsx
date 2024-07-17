// APIs
import { getProjects } from '@/api';

// Auth
import { auth } from '@/auth';

// Components
import { ErrorMessage, ItemNotFound, OverviewCard } from '@/components';

// Constants
import { LIMIT_ITEMS, ORDER_BY, ROUTES } from '@/constants';

const ProjectList = async () => {
  const session = await auth();

  const { data, error } = await getProjects({
    limitItem: LIMIT_ITEMS.BOARD_PAGE,
    orderItem: { field: ORDER_BY.UPDATED_AT, type: 'desc' },
  });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (data.length == 0) {
    return (
      <ItemNotFound
        title="Empty Projects"
        description="Your projects are currently empty. Please create new projects or stay tuned for updates"
        customClass={{
          wrapper: 'bg-white dark:bg-zinc-800 p-10 rounded-lg h-full',
        }}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg h-full">
      <span className="text-xl font-bold dark:text-white">
        {session ? 'My' : 'All'} Projects
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-3 gap-6 ">
        {data.map((project) => {
          const { id, slug, title, description, image } = project;

          return (
            <OverviewCard
              key={id}
              href={
                session
                  ? ROUTES.ADMIN_PROJECT_DETAIL(id)
                  : ROUTES.PROJECT_DETAIL(slug)
              }
              title={title}
              description={description}
              imageSrc={image}
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
