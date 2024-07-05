// APIs
import { queryUserList } from '@/db';

// Components
import { CreateTaskFormWrapper } from '@/ui';
import { ItemNotFound } from '@/components';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const CreateTaskPage = async () => {
  const { data: userList, error } = await queryUserList();

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
          {error ? (
            <ItemNotFound
              title={ERROR_MESSAGES.REQUESTING_DATA}
              description={`Please try again later. (Error:${error})`}
            />
          ) : (
            <CreateTaskFormWrapper memberOptions={userList} />
          )}
        </div>
      </div>
    </main>
  );
};

export default CreateTaskPage;
