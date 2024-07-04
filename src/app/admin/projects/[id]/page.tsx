// APIs
import { queryUserList } from '@/db';

// Components
import { EditProjectFormWrapper } from '@/ui';
import { ItemNotFound } from '@/components';

// Constants
import { ERROR_MESSAGES, MOCK_PROJECT_LIST } from '@/constants';

const EditProjectPage = async ({ params }: { params: { id: string } }) => {
  const { data: userList, error } = await queryUserList();
  // TODO: Query Project Detail and Participants List
  const MOCK_PROJECT = MOCK_PROJECT_LIST[0];
  const MOCK_PARTICIPANTIONS = ['gjrdDS6Qu5Ogh6jebhFNWW1dBRx1'];

  return (
    <main className="p-4 flex flex-col gap-8 pt-8 justify-items-stretch">
      <div className=" dark:text-white ">
        <h1 className="font-bold text-3xl">Projects</h1>
      </div>
      <div className="w-full text-center py-4">
        <h1 className="font-bold text-3xl">Edit Project id:{params.id}</h1>
      </div>
      <div className="bg-white rounded-lg">
        <div className="w-full md:w-2/3 max-w-[700px] p-10 mx-auto ">
          {error ? (
            <ItemNotFound
              title={ERROR_MESSAGES.REQUESTING_DATA}
              description={`Please try again later. (Error:${error})`}
            />
          ) : (
            <EditProjectFormWrapper
              memberOptions={userList}
              data={MOCK_PROJECT}
              participations={MOCK_PARTICIPANTIONS}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default EditProjectPage;
