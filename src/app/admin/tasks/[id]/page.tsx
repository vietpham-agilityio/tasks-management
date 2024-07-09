// APIs
import { queryUserList } from '@/db';

// Components
import { EditTaskFormWrapper } from '@/ui';
import { ItemNotFound } from '@/components';

// Constants
import { ERROR_MESSAGES } from '@/constants';
import { getProjects } from '@/api';
import { getTaskById } from '@/api/tasks';

const EditTaskPage = async ({ params }: { params: { id: string } }) => {
  const { data: userList, error } = await queryUserList();
  const { data: projectList, error: projectError } = await getProjects();
  const { data: taskData, error: taskError } = await getTaskById(params.id);

  // Determine if there is an error in fetching data or if taskData is unavailable
  const isError = error || projectError || taskError || !taskData;

  return (
    <main className="p-4 flex flex-col gap-8 pt-8 justify-items-stretch">
      <div className=" dark:text-white ">
        <h1 className="font-bold text-3xl">Task</h1>
      </div>
      <div className="w-full text-center py-4">
        <h1 className="font-bold text-3xl">Edit Task: {taskData?.title}</h1>
      </div>
      <div className="bg-white rounded-lg">
        <div className="w-full md:w-2/3 max-w-[700px] p-10 mx-auto ">
          {isError ? (
            <ItemNotFound
              title={ERROR_MESSAGES.REQUESTING_DATA}
              description={`Please try again later. (Error:${error || projectError || taskError})`}
            />
          ) : (
            <EditTaskFormWrapper
              memberOptions={userList}
              listProject={projectList || []}
              taskData={taskData}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default EditTaskPage;
