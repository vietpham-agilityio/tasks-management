// Auth
import { auth } from '@/auth';

// APIs
import { getTaskStatistic } from '@/api';

// Components
import { ErrorMessage, ItemNotFound, StatisticCard } from '@/components';

// Constants
import {
  QUERY_PARAMS,
  ROUTES,
  TAGS,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
} from '@/constants';

// Types
import { VariantType } from '@/types';
import { TaskStatisticQueryParam } from '@/models';

// Icons
import {
  BoardIcon,
  ClockIcon,
  HomeIcon,
  ProjectIcon,
  TaskIcon,
  UserIcon,
} from '@/icons';

const TASK_STATISTIC_QUERY_PARAMS: TaskStatisticQueryParam[] = [
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

const statisticCardMapping = {
  [TASK_STATUS_VALUE.NOT_STARTED]: {
    label: 'Not Started',
    variant: 'primary',
    order: 1,
    icon: <HomeIcon customClass="w-5 h-5" />,
  },
  [TASK_STATUS_VALUE.IN_PROGRESS]: {
    label: 'In Progress',
    variant: 'secondary',
    order: 2,
    icon: <TaskIcon customClass="w-5 h-5" />,
  },
  [TASK_STATUS_VALUE.DONE]: {
    label: 'Done',
    variant: 'success',
    order: 3,
    icon: <ProjectIcon customClass="w-5 h-5" />,
  },
  [TASK_PRIORITY_VALUE.LOW]: {
    label: 'Low Priority',
    variant: 'tertiary',
    order: 4,
    icon: <ClockIcon customClass="w-5 h-5" />,
  },
  [TASK_PRIORITY_VALUE.MEDIUM]: {
    label: 'Medium Priority',
    variant: 'warning',
    order: 5,
    icon: <UserIcon customClass="w-5 h-5" />,
  },
  [TASK_PRIORITY_VALUE.HIGH]: {
    label: 'High Priority',
    variant: 'error',
    order: 6,
    icon: <BoardIcon customClass="w-5 h-5" />,
  },
};

const TaskList = async () => {
  const session = await auth();

  const { data: taskStatistics, error } = await getTaskStatistic(
    TASK_STATISTIC_QUERY_PARAMS,
    {
      options: { tags: [TAGS.TASK_LIST] },
    },
  );

  if (error) return <ErrorMessage message={error} />;

  if (taskStatistics.length == 0) {
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

  // Sort statistic task by order
  const sortedData = taskStatistics
    .map((taskStatistic) => ({
      ...taskStatistic,
      statisticCard:
        statisticCardMapping[
          taskStatistic.label as TASK_PRIORITY_VALUE | TASK_STATUS_VALUE
        ],
    }))
    .sort((a, b) => a.statisticCard.order - b.statisticCard.order);

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg h-full">
      <span className="text-xl font-bold dark:text-white">
        {session ? 'My' : 'All'} Tasks
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 pt-3">
        {sortedData.map((taskStatistic) => {
          const statisticCard = taskStatistic.statisticCard;
          return (
            <StatisticCard
              key={statisticCard.label}
              to={session ? ROUTES.ADMIN_TASK_LIST : ROUTES.TASK_LIST}
              icon={statisticCard.icon}
              label={statisticCard.label}
              description={taskStatistic.total.toString()}
              variant={statisticCard.variant as VariantType}
              customClass={{
                wrapper: 'hover:opacity-70 dark:hover:opacity-90',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export { TaskList };
