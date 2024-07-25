// APIs
import { getTasks } from '@/api';

// Auth
import { auth } from '@/auth';

// Components
import { ErrorMessage, ItemNotFound, OverviewCard } from '@/components';

// Constants
import { DATE_FORMAT, LIMIT_ITEMS, ORDER_BY, ROUTES } from '@/constants';

// Types
import { Task } from '@/models';

// Utils
import { formatDate } from '@/utils';

const RecentlyCreatedTaskList = async () => {
  const session = await auth();
  const { data, error } = await getTasks({
    limitItem: LIMIT_ITEMS.RECENTLY_TASK,
    orderItem: { field: ORDER_BY.CREATED_AT, type: 'desc' },
  });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (data.length == 0) {
    return (
      <ItemNotFound
        title="Empty Tasks"
        description="Your tasks are currently empty. Please create new tasks or stay tuned for updates"
        customClass={{
          wrapper: 'bg-white dark:bg-zinc-800 h-full rounded-lg p-10',
        }}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg h-full">
      <span className="text-xl font-bold dark:text-white">
        Recently Created Tasks
      </span>
      <div className="flex flex-col gap-4 pt-3">
        {data.map((task: Task) => {
          const { id, slug, createdAt, title, description, image } = task;

          return (
            <OverviewCard
              key={id}
              href={
                session
                  ? ROUTES.ADMIN_TASK_DETAIL(id)
                  : ROUTES.TASK_DETAIL(encodeURIComponent(slug))
              }
              time={formatDate(createdAt, DATE_FORMAT.Hour)}
              title={title}
              description={description}
              isRowDisplay={true}
              imageSrc={image || '/image-not-available.webp'}
              customClass={{
                wrapper: 'hover:bg-zinc-100 dark:hover:bg-zinc-700',
                image: 'md:max-w-20 md:aspect-square',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export { RecentlyCreatedTaskList };
