// APIs
import { queryUserList } from '@/db';
import { getProjectByTaskId, getTaskById } from '@/api';

// Components
import { EditTaskFormWrapper } from '@/ui';
import { ErrorMessage, ItemNotFound } from '@/components';

// Constants
import { ERROR_MESSAGES, FIELDS, ORDER_TYPES } from '@/constants';
import { getProjects } from '@/api';

const EditTaskPage = async ({ params }: { params: { id: string } }) => {
  const { data: userList, error: userListError } = await queryUserList();
  const { data: projectList, error: projectListError } = await getProjects({
    orderItem: {
      field: FIELDS.TITLE,
      type: ORDER_TYPES.DESC,
    },
  });
  const { data: taskData, error: taskError } = await getTaskById(params.id);
  const { data: projectData, error: projectError } = await getProjectByTaskId(
    params.id,
  );

  // Determine if there is an error in fetching data
  const error = userListError || projectListError || taskError || projectError;

  const renderTaskDetail = () => {
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (!projectData || !taskData) {
      return (
        <ItemNotFound
          title={ERROR_MESSAGES.DATA_NOT_FOUND}
          description="Please try again later"
          customClass={{
            wrapper: 'rounded-lg px-5 bg-white py-20',
          }}
        />
      );
    }
    return (
      <EditTaskFormWrapper
        memberOptions={userList}
        listProject={projectList}
        taskData={taskData}
        isProjectArchived={projectData.isArchived}
      />
    );
  };

  return (
    <main className="p-4 flex flex-col gap-8 pt-8 justify-items-stretch">
      <div className=" dark:text-white ">
        <h1 className="font-bold text-3xl">Tasks</h1>
      </div>
      <div className="w-full text-center py-4">
        <h1 className="font-bold text-3xl">Edit Task: {taskData?.title}</h1>
      </div>
      <div className="bg-white rounded-lg">
        <div className="w-full md:w-2/3 max-w-3xl p-10 mx-auto ">
          {renderTaskDetail()}
        </div>
      </div>
    </main>
  );
};

export default EditTaskPage;
