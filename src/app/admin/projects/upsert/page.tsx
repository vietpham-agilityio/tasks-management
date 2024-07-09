// APIs
import { queryUserList } from '@/db';
import { getPartipationsByProjectId, getProjectById } from '@/api';

// Components
import { CreateProjectFormWrapper, EditProjectFormWrapper } from '@/ui';
import { ItemNotFound } from '@/components';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const UpserProjectPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const { data: userList, error: userListError } = await queryUserList();
  const { data: projectData, error: projectError } = await getProjectById(
    searchParams.id,
  );
  const { data: participationData, error: participationError } =
    await getPartipationsByProjectId(searchParams.id);

  const isEdited = !!projectData;
  const error =
    userListError ||
    (!!searchParams.id && (projectError || participationError));

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
          {error ? (
            <ItemNotFound
              title={ERROR_MESSAGES.REQUESTING_DATA}
              description={`Please try again later. (Error:${error})`}
            />
          ) : (
            <>
              {isEdited ? (
                <EditProjectFormWrapper
                  memberOptions={userList}
                  data={projectData}
                  participations={
                    participationData?.map((user) => user.userId) || []
                  }
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
