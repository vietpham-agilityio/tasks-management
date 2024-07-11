'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button } from '@/components';

// Icons
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';

type ActionBarProps = {
  projectId: string;
};

export const ProjectActionBar = ({ projectId }: ActionBarProps) => {
  const router = useRouter();

  // TODO: Create a modal to confirm removing project
  const handleRemoveProject = useCallback(() => {}, []);

  const handleEditProject = useCallback(() => {
    router.push(ROUTES.ADMIN_UPSERT_PROJECT(projectId));
  }, [projectId, router]);

  const handleCreateNewTask = useCallback(() => {
    router.push(ROUTES.ADMIN_CREATE_TASK);
  }, [projectId, router]);

  return (
    <div className="flex flex-row gap-3 w-full justify-end">
      <Button
        onClick={handleCreateNewTask}
        startIcon={<FaPlus className="w-5 h-5 mr-2" />}
        variant="outline"
        customClass="border-black hover:bg-zinc-300 font-bold dark:text-white lg:hidden"
      >
        Create New Task
      </Button>
      <Button
        onClick={handleEditProject}
        startIcon={<FaPen className="w-5 h-5 mr-2" />}
        variant="outline"
        customClass="border-black hover:bg-zinc-300 font-bold dark:text-white"
      >
        Edit
      </Button>
      <Button
        onClick={handleRemoveProject}
        startIcon={<FaTrash className="w-5 h-5 mr-2" />}
        variant="outline"
        customClass="border-black hover:bg-zinc-300 font-bold dark:text-white"
      >
        Remove
      </Button>
    </div>
  );
};
