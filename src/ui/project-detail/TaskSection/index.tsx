import dayjs from 'dayjs';

// Auths
import { auth } from '@/auth';

// Constants
import {
  DATE_FORMAT,
  MOCK_TASK_LIST,
  ROUTES,
  TASK_SECTION_VARIANT_MAPPING,
  TASK_STATUS_VALUE,
} from '@/constants';

// Components
import { NavLink, OverviewCard, Badge } from '@/components';

// Icons
import { ClockIcon } from '@/icons';
import { FaPlus } from 'react-icons/fa';

// Utils
import { cn, formatDate } from '@/utils';

type TaskSectionProps = {
  //   projectId: string
  title: string;
  value: TASK_STATUS_VALUE;
  //   queryParams: URLSearchParams
};

export const TaskSection = async ({
  //   projectId,
  title,
  value,
  //   queryParams,
}: TaskSectionProps) => {
  const session = await auth();

  // TODO: Query and Filter Task by Task Status and other Params
  const data = MOCK_TASK_LIST;

  const variant = TASK_SECTION_VARIANT_MAPPING[value];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center gap-3 items-center font-medium py-2 px-5 text-sm dark:text-white dark:bg-neutral-700 bg-zinc-100 rounded-lg">
        <div
          className={cn('w-6 h-6 rounded-lg', {
            'bg-amber-400': variant === 'warning',
            'bg-red-500': variant === 'error',
            'bg-emerald-500': variant === 'success',
          })}
        />
        {title}
      </div>
      <div className="flex flex-col gap-4 max-h-svh overflow-y-scroll">
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
                wrapper: 'hover:bg-zinc-300',
              }}
            />
          );
        })}
      </div>
      {session && (
        <NavLink
          href={ROUTES.ADMIN_CREATE_TASK}
          label="Add new"
          icon={<FaPlus />}
          className="border text-black dark:text-white hover:bg-zinc-300 hover:text-black dark:hover:text-white py-3"
        />
      )}
    </div>
  );
};
