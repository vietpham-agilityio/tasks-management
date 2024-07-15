// Icons
import { FaPlus } from 'react-icons/fa';

// Components
import { TaskTable } from '@/ui';
import { ErrorMessage, NavLink } from '@/components';

// Constants
import {
  FIELDS,
  LIMIT_ITEMS,
  ORDER_TYPES,
  QUERY_PARAMS,
  ROUTES,
} from '@/constants';

// APIs
import { getTasks } from '@/api';

// Types
import { SearchParams } from '@/types';
import { WhereFilterOp } from 'firebase/firestore';

const TaskListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page = '1', sortBy, status, priority } = searchParams;

  const query = [];

  if (status) {
    const statusFilterList = decodeURIComponent(status)?.split(',');

    query.push({
      field: QUERY_PARAMS.STATUS,
      comparison: 'in' as WhereFilterOp,
      value: statusFilterList,
    });
  }

  if (priority) {
    const priorityFilterList = decodeURIComponent(priority)?.split(',');

    query.push({
      field: QUERY_PARAMS.PRIORITY,
      comparison: 'in' as WhereFilterOp,
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
    <main className="bg-white p-4 h-full">
      <div className="flex flex-row justify-between items-center py-8 ">
        <div className=" dark:text-white ">
          <h1 className="font-bold text-3xl">Tasks</h1>
        </div>
        <NavLink
          href={ROUTES.ADMIN_TASK_CREATE()}
          label="Create New Task"
          icon={<FaPlus />}
          className="bg-neutral-800 text-white font-bold py-3"
        />
      </div>
      <TaskTable isAdmin={true} data={data} total={total} />
    </main>
  );
};

export default TaskListPage;
