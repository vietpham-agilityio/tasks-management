// APIs
import { queryUserList } from '@/db';

// Components
import { CreateProjectFormWrapper, EditProjectFormWrapper } from '@/ui';
import { ItemNotFound } from '@/components';

// Constants
import { ERROR_MESSAGES, MOCK_PROJECT_LIST } from '@/constants';

const UpserProjectPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const { data: userList, error: userListError } = await queryUserList();

  // TODO: Query Project Detail and Participants List
  const projectData = searchParams.id ? MOCK_PROJECT_LIST[0] : null;
  const participationData = searchParams.id
    ? ['gjrdDS6Qu5Ogh6jebhFNWW1dBRx1']
    : [];

  const isEdited = !!projectData;
  const isError = !!userListError;

  return (
    <main className="p-4 flex flex-col gap-8 pt-8 justify-items-stretch">
      <div className=" dark:text-white ">
        <h1 className="font-bold text-3xl">Projects</h1>
      </div>
      <div className="w-full text-center py-4">
        <h1 className="font-bold text-3xl">
          {isEdited
            ? `Edit Project id: ${searchParams.id}`
            : 'Create a Project'}
        </h1>
      </div>
      <div className="bg-white rounded-lg">
        <div className="w-full md:w-2/3 max-w-[700px] p-10 mx-auto ">
          {isError ? (
            <ItemNotFound
              title={ERROR_MESSAGES.REQUESTING_DATA}
              description={`Please try again later. (Error:${userListError})`}
            />
          ) : (
            <>
              {isEdited ? (
                <EditProjectFormWrapper
                  memberOptions={userList}
                  data={projectData}
                  participations={participationData}
                />
              ) : (
                <CreateProjectFormWrapper memberOptions={userList} />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default UpserProjectPage;
