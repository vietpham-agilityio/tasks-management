import { Suspense } from 'react';
import Link from 'next/link';

// Icons
import { MdArrowRightAlt } from 'react-icons/md';

// Components
import { ItemNotFound, PaginationWrapper, Text } from '@/components';
import { FilterWrapper } from '../FilterWrapper';

// Constants
import {
  DATE_FORMAT,
  LIMIT_ITEMS,
  ROUTES,
  TASK_PRIORITY_VALUE,
  TASK_STATUS_VALUE,
} from '@/constants';

// Utils
import { formatDate } from '@/utils';

// Types
import { VariantType } from '@/types';

// Models
import { Task } from '@/models';

interface TaskTableProps {
  isAuthenticated?: boolean;
  data: Task[];
  total?: number;
}

const labelMapping = {
  [TASK_STATUS_VALUE.NOT_STARTED]: {
    value: 'Not Started',
    variant: 'primary',
  },
  [TASK_STATUS_VALUE.IN_PROGRESS]: {
    value: 'In Progress',
    variant: 'secondary',
  },
  [TASK_STATUS_VALUE.DONE]: {
    value: 'Done',
    variant: 'success',
  },
  [TASK_PRIORITY_VALUE.LOW]: {
    value: 'Low',
    variant: 'quaternary',
  },
  [TASK_PRIORITY_VALUE.MEDIUM]: {
    value: 'Medium',
    variant: 'active',
  },
  [TASK_PRIORITY_VALUE.HIGH]: {
    value: 'High',
    variant: 'error',
  },
};

export const TaskTable = async ({
  isAuthenticated = false,
  data,
  total,
}: TaskTableProps) => {
  if (data.length === 0) {
    return (
      <ItemNotFound
        title="Empty Tasks"
        description="Your task are currently empty. Please create new task or stay tuned for updates"
      />
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <FilterWrapper showStatusFilter />
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase text-gray-700 bg-gray-50 dark:bg-zinc-700 dark:text-gray-300">
          <tr className="font-bold">
            <th className="px-6 py-4">Task Name</th>
            <th className="px-2">Status</th>
            <th className="px-2">Date</th>
            <th className="px-2">Priority</th>
            <th className="px-2 hidden sm:block mt-3.5">Estimation</th>
            <th className="w-6" />
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-800">
          {data.map((task) => {
            const { value: statusValue, variant: statusVariant } =
              labelMapping[task.status];
            const { value: priorityValue, variant: priorityVariant } =
              labelMapping[task.priority];

            return (
              <tr
                key={task.id}
                className="border-b-2 px-8 py-5 rounded-lg hover:bg-zinc-300 dark:hover:bg-gray-700 text-sm"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap w-full max-w-0 xl:w-auto">
                  <Link
                    href={
                      isAuthenticated
                        ? ROUTES.ADMIN_TASK_DETAIL(task.id)
                        : ROUTES.TASK_DETAIL(task.slug)
                    }
                  >
                    <p className="truncate">{task.title}</p>
                  </Link>
                </td>
                <td className="min-w-20 sm:min-w-28 px-2 py-4">
                  <Text
                    value={statusValue}
                    variant={statusVariant as VariantType}
                    customClass="font-medium px-0"
                  />
                </td>
                <td>
                  <p className="text-gray-900 dark:text-white min-w-16 sm:min-w-28 pl-2">
                    {formatDate(task.createdAt, DATE_FORMAT.Secondary)}
                  </p>
                </td>
                <td className="px-2 py-4">
                  <Text
                    value={priorityValue}
                    variant={priorityVariant as VariantType}
                    customClass="font-medium px-0"
                  />
                </td>
                <td className="hidden sm:block mt-3.5">
                  <Text
                    customClass="w-full text-gray-900 dark:text-white"
                    value="1 hour"
                  />
                </td>
                <td>
                  <Link
                    href={
                      isAuthenticated
                        ? ROUTES.ADMIN_TASK_DETAIL(task.id)
                        : ROUTES.TASK_DETAIL(task.slug)
                    }
                    aria-label="task-detail"
                    className="px-2 md:px-4 flex justify-end"
                  >
                    <MdArrowRightAlt className="w-6 h-6 text-gray-900 dark:text-white" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-10 sm:mt-6 flex justify-end">
        {total && (
          <Suspense>
            <PaginationWrapper total={total} pageSize={LIMIT_ITEMS.DEFAULT} />
          </Suspense>
        )}
      </div>
    </div>
  );
};
