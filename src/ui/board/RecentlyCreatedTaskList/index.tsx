// APIs
import { getTasks } from '@/api';

// Auth
import { auth } from '@/auth';

// Components
import { ErrorMessage, ItemNotFound, OverviewCard } from '@/components';

// Constants
import { DATE_FORMAT, LIMIT_ITEMS, ORDER_BY, ROUTES } from '@/constants';

// Utils
import { formatDate } from '@/utils';

const RecentlyCreatedTasktList = async () => {
  const session = await auth();
  const { data, error } = await getTasks({
    limitItem: LIMIT_ITEMS.BOARD_PAGE,
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
      <div className="flex flex-col gap-4 pt-3 ">
        {data.map((task) => {
          return (
            <OverviewCard
              key={task.id}
              href={
                session
                  ? ROUTES.ADMIN_TASK_DETAIL(task.id)
                  : ROUTES.TASK_DETAIL(encodeURIComponent(task.slug))
              }
              time={formatDate(task.createdAt, DATE_FORMAT.Hour)}
              title={task.title}
              description={task.description}
              isRowDisplay={true}
              customClass={{
                wrapper: 'hover:bg-zinc-100',
                image: 'max-w-24',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export { RecentlyCreatedTasktList };
