// Components
import { TaskTable } from '@/ui';
import { ErrorMessage } from '@/components';

// Constants
import { FIELDS, LIMIT_ITEMS, ORDER_TYPES, QUERY_PARAMS } from '@/constants';

// APIs
import { getTasks } from '@/api';

// Types
import { QueryFilter, SearchParams } from '@/types';

const TaskListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page = '1', sortBy, status, priority } = searchParams;

  const query: QueryFilter[] = [];

  if (status) {
    const statusFilterList = decodeURIComponent(status)?.split(',');

    query.push({
      field: QUERY_PARAMS.STATUS,
      comparison: 'in',
      value: statusFilterList,
    });
  }

  if (priority) {
    const priorityFilterList = decodeURIComponent(priority)?.split(',');

    query.push({
      field: QUERY_PARAMS.PRIORITY,
      comparison: 'in',
      value: priorityFilterList,
    });
  }

  const { data, error, total } = await getTasks({
    page: parseInt(page),
    limitItem: LIMIT_ITEMS.DEFAULT,
    orderItem: {
      field: FIELDS.UPDATED_AT,
      type: sortBy || ORDER_TYPES.DESC,
    },
    query,
  });

  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="bg-white dark:bg-neutral-900 p-4 h-full">
      <div className="flex flex-row justify-between items-center py-8 ">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl dark:text-white">Tasks</h1>
        </div>
      </div>
      <TaskTable isAdmin={true} data={data} total={total} />
    </main>
  );
};

export default TaskListPage;
