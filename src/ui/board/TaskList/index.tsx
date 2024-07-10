// Auth
import { auth } from '@/auth';

// APIs
import { getTaskStatistic } from '@/api';

// Components
import { ItemNotFound, StatCard } from '@/components';

// Constants
import {
  QUERY_PARAMS,
  ROUTES,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
} from '@/constants';

// Types
import { VariantType } from '@/types';
import { TaskStatQueryParam, TaskStatResponse } from '@/models';

// Icons
import { BoardIcon, ProjectIcon } from '@/icons';

const TASK_STAT_QUERY_PARAMS: TaskStatQueryParam[] = [
  {
    field: QUERY_PARAMS.STATUS,
    value: TASK_STATUS_VALUE.NOT_STARTED,
  },
  {
    field: QUERY_PARAMS.STATUS,
    value: TASK_STATUS_VALUE.IN_PROGRESS,
  },
  {
    field: QUERY_PARAMS.STATUS,
    value: TASK_STATUS_VALUE.DONE,
  },
  {
    field: QUERY_PARAMS.PRIORITY,
    value: TASK_PRIORITY_VALUE.HIGH,
  },
  {
    field: QUERY_PARAMS.PRIORITY,
    value: TASK_PRIORITY_VALUE.MEDIUM,
  },
  {
    field: QUERY_PARAMS.PRIORITY,
    value: TASK_PRIORITY_VALUE.LOW,
  },
];

const TaskList = async () => {
  const session = await auth();

  const { data, error } = await getTaskStatistic(TASK_STAT_QUERY_PARAMS);

  const statCardMapping = {
    [TASK_STATUS_VALUE.NOT_STARTED]: {
      label: 'Not Started',
      variant: 'primary',
      icon: <ProjectIcon customClass="w-5 h-5" />,
    },
    [TASK_STATUS_VALUE.IN_PROGRESS]: {
      label: 'In Progress',
      variant: 'secondary',
      icon: <ProjectIcon customClass="w-5 h-5" />,
    },
    [TASK_STATUS_VALUE.DONE]: {
      label: 'Done',
      variant: 'success',
      icon: <ProjectIcon customClass="w-5 h-5" />,
    },
    [TASK_PRIORITY_VALUE.LOW]: {
      label: 'Low Priority',
      variant: 'tertiary',
      icon: <BoardIcon customClass="w-5 h-5" />,
    },
    [TASK_PRIORITY_VALUE.MEDIUM]: {
      label: 'Medium Priority',
      variant: 'warning',
      icon: <BoardIcon customClass="w-5 h-5" />,
    },
    [TASK_PRIORITY_VALUE.HIGH]: {
      label: 'High Priority',
      variant: 'error',
      icon: <BoardIcon customClass="w-5 h-5" />,
    },
  };

  if (error)
    return (
      <ItemNotFound
        title="Error"
        description={error}
        customClass={{
          wrapper: 'bg-white dark:bg-zinc-800 h-full rounded-lg',
          description: 'text-red-500',
        }}
      />
    );

  if (data.length == 0) {
    return (
      <ItemNotFound
        title="Empty Tasks"
        description="Your Tasks are currently empty. Please create new tasks or stay tuned for updates"
        customClass={{
          wrapper: 'bg-white dark:bg-zinc-800 h-full rounded-lg',
        }}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg h-full">
      <span className="text-xl font-bold dark:text-white">
        {session ? 'My' : 'All'} Tasks
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 pt-3">
        {data.map((stat: TaskStatResponse) => {
          const statCard =
            statCardMapping[
              stat.label as TASK_PRIORITY_VALUE | TASK_STATUS_VALUE
            ];
          return (
            <StatCard
              key={stat.label}
              to={session ? ROUTES.ADMIN_TASK_LIST : ROUTES.TASK_LIST}
              icon={statCard.icon}
              label={statCard.label}
              description={stat.total.toString()}
              variant={statCard.variant as VariantType}
              customClass={{
                wrapper: 'hover:opacity-1.1',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export { TaskList };
