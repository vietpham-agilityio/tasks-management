import dayjs from 'dayjs';

// APIs
import { getTasks } from '@/api';

// Auths
import { auth } from '@/auth';

// Constants
import {
  DATE_FORMAT,
  ORDER_BY,
  QUERY_PARAMS,
  ROUTES,
  TASK_SECTION_VARIANT_MAPPING,
  TASK_STATUS_VALUE,
} from '@/constants';

// Components
import {
  NavLink,
  OverviewCard,
  Badge,
  ErrorMessage,
  ItemNotFound,
} from '@/components';

// Icons
import { ClockIcon } from '@/icons';
import { FaPlus } from 'react-icons/fa';

// Utils
import { cn, formatDate } from '@/utils';

type TaskSectionProps = {
  projectId: string;
  title: string;
  value: TASK_STATUS_VALUE;
  //   queryParams: URLSearchParams
};

export const TaskSection = async ({
  projectId,
  title,
  value,
  //   queryParams,
}: TaskSectionProps) => {
  const session = await auth();

  const { data, error } = await getTasks({
    query: [
      {
        field: QUERY_PARAMS.PROJECT_ID,
        comparison: '==',
        value: projectId,
      },
      { field: QUERY_PARAMS.STATUS, comparison: '==', value: value },
    ],
    orderItem: {
      field: ORDER_BY.CREATED_AT,
      type: 'desc',
    },
  });

  const variant = TASK_SECTION_VARIANT_MAPPING[value];

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-row justify-center gap-3 items-center font-medium py-2 px-5 text-sm dark:text-white dark:bg-neutral-700 bg-white rounded-lg border">
        <div
          className={cn('w-6 h-6 rounded-lg', {
            'bg-amber-400': variant === 'warning',
            'bg-red-500': variant === 'error',
            'bg-emerald-500': variant === 'success',
          })}
        />
        {title}
      </div>
      {data.length === 0 ? (
        <ItemNotFound
          title="Empty Tasks"
          description="Your tasks are currently empty. Please create new tasks or stay tuned for updates"
          customClass={{
            wrapper: ' rounded-lg px-5 bg-white border',
          }}
        />
      ) : (
        <div className="flex flex-col gap-4 ">
          {data.map((task) => {
            const isLate =
              dayjs(new Date()).isAfter(dayjs(new Date(task.dueDate))) &&
              task.status !== TASK_STATUS_VALUE.DONE;
            return (
              <OverviewCard
                key={`task-${task.id}`}
                href={
                  session
                    ? ROUTES.ADMIN_TASK_DETAIL(task.id)
                    : ROUTES.TASK_DETAIL(task.id)
                }
                title={task.title}
                description={task.description}
                imageSrc={task.image}
                badge={
                  <Badge
                    label={formatDate(task.dueDate, DATE_FORMAT.Secondary)}
                    icon={<ClockIcon />}
                    customClass="rounded-md text-white text-sm"
                    theme={isLate ? 'error' : 'success'}
                  />
                }
                customClass={{
                  wrapper: 'hover:bg-zinc-300 bg-white',
                }}
              />
            );
          })}
        </div>
      )}

      {session && (
        <NavLink
          href={ROUTES.ADMIN_TASK_CREATE({
            projectId,
            status: value,
          })}
          label="Add new"
          icon={<FaPlus />}
          className="border text-black dark:text-white hover:bg-zinc-300 hover:font-normal hover:text-black dark:hover:text-white py-3 hidden lg:flex"
        />
      )}
    </div>
  );
};
