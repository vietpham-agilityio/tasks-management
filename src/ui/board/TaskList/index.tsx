// Auth
import { auth } from '@/auth';

// Components
import { StatCard } from '@/components';

// Constants
import { ROUTES, TASK_PRIORITY_VALUE, TASK_STATUS_VALUE } from '@/constants';

// Types
import { VariantType } from '@/types';

// Icons
import { BoardIcon, ProjectIcon } from '@/icons';

const TaskList = async () => {
  const session = await auth();

  const data = [
    {
      title: 'high',
      description: '23',
    },
    {
      title: 'low',
      description: '23',
    },
    {
      title: 'medium',
      description: '23',
    },
    {
      title: 'done',
      description: '23',
    },
    {
      title: 'in_progress',
      description: '23',
    },
    {
      title: 'not_started',
      description: '23',
    },
  ];

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

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
      <span className="text-xl font-bold dark:text-white">My Task</span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 pt-3">
        {data.map((stat) => {
          const statCard =
            statCardMapping[
              stat.title as TASK_PRIORITY_VALUE | TASK_STATUS_VALUE
            ];
          return (
            <StatCard
              key={stat.title}
              to={session ? ROUTES.ADMIN_TASK_LIST : ROUTES.TASK_LIST}
              icon={statCard.icon}
              label={statCard.label}
              description={stat.description}
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
