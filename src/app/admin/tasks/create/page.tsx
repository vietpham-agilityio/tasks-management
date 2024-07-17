// APIs
import { getPartipationsByProjectId, getProjectById } from '@/api';

// Components
import { CreateTaskFormWrapper } from '@/ui';
import { ErrorMessage, ItemNotFound } from '@/components';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const CreateTaskPage = async ({
  searchParams,
}: {
  searchParams: { projectId: string };
}) => {
  const projectId = searchParams.projectId;
  const { data: participantList, error: participantListError } =
    await getPartipationsByProjectId(projectId);
  const { data: projectData, error: projectError } =
    await getProjectById(projectId);

  const error = participantListError || projectError;

  const renderCreateTask = () => {
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (!projectData) {
      return (
        <ItemNotFound
          title={ERROR_MESSAGES.DATA_NOT_FOUND}
          description="Please create new user or new project to proceed."
          customClass={{
            wrapper: 'rounded-lg px-5 bg-white py-20',
          }}
        />
      );
    }
    return (
      <CreateTaskFormWrapper
        memberOptions={participantList}
        project={projectData}
      />
    );
  };

  return (
    <main className="p-4 flex flex-col gap-8 pt-8 justify-items-stretch">
      <div className=" dark:text-white ">
        <h1 className="font-bold text-3xl">Tasks</h1>
      </div>
      <div className="w-full text-center py-4">
        <h1 className="font-bold text-3xl">Create a Task</h1>
      </div>
      <div className="bg-white rounded-lg">
        <div className="w-full md:w-2/3 max-w-3xl p-10 mx-auto ">
          {renderCreateTask()}
        </div>
      </div>
    </main>
  );
};

export default CreateTaskPage;
