import dayjs from 'dayjs';

// APIs
import { getTasks } from '@/api';

// Auths
import { auth } from '@/auth';

// Constants
import {
  ORDER_BY,
  ORDER_TYPES,
  QUERY_PARAMS,
  ROUTES,
  TASK_PRIORITY_VALUE,
  TASK_SECTION_VARIANT_MAPPING,
  TASK_STATUS_VALUE,
} from '@/constants';

// Components
import { NavLink, ErrorMessage, ItemNotFound } from '@/components';
import { DeleteTaskWrapper } from '@/ui';

// Types
import { WhereFilterOp } from 'firebase/firestore';
import { QueryFilter } from '@/types';

// Icons
import { FaPlus } from 'react-icons/fa';

// Utils
import { cn } from '@/utils';

type TaskSectionProps = {
  projectId: string;
  title: string;
  sortBy?: ORDER_TYPES;
  priority?: TASK_PRIORITY_VALUE;
  value: TASK_STATUS_VALUE;
  isShowCreateTask?: boolean;
};

export const TaskSection = async ({
  projectId,
  title,
  value,
  priority,
  sortBy = ORDER_TYPES.DESC,
  isShowCreateTask = true,
}: TaskSectionProps) => {
  const session = await auth();

  const query: QueryFilter[] = [
    {
      field: QUERY_PARAMS.PROJECT_ID,
      comparison: '==' as WhereFilterOp,
      value: projectId,
    },
    {
      field: QUERY_PARAMS.STATUS,
      comparison: '==' as WhereFilterOp,
      value: value,
    },
  ];

  if (priority) {
    const priorityFilterList = decodeURIComponent(priority)?.split(',');

    query.push({
      field: QUERY_PARAMS.PRIORITY,
      comparison: 'in' as WhereFilterOp,
      value: priorityFilterList,
    });
  }

  const { data, error } = await getTasks({
    query,
    orderItem: {
      field: ORDER_BY.CREATED_AT,
      type: sortBy,
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
              <DeleteTaskWrapper
                key={`task-${task.id}`}
                isLate={isLate}
                session={session}
                task={task}
              />
            );
          })}
        </div>
      )}

      {session && isShowCreateTask && (
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
