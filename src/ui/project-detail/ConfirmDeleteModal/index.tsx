'use client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

// Actions
import { removeProjectById, archiveProjectById } from '@/actions';

// Components
import { BaseModal, Button } from '@/components';

// Constants
import { ROUTES, SUCCESS_MESSAGES } from '@/constants';

// HOCs
import { TWithToast, withToast } from '@/hocs';

// Icons
import { FaArchive, FaTrash } from 'react-icons/fa';

type ConfirmDeleteModalBaseProps = {
  projectId: string;
  isOpen: boolean;
  setModalState: (value: boolean) => void;
};

const ConfirmDeleteModalBase = ({
  projectId,
  isOpen,
  setModalState,
  openToast,
}: TWithToast<ConfirmDeleteModalBaseProps>) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleArchiveProject = useCallback(async () => {
    setLoading(true);
    const { success, error } = await archiveProjectById(projectId, true);
    setLoading(false);
    setModalState(false);
    if (success) {
      openToast({
        variant: 'success',
        message: SUCCESS_MESSAGES.ARCHIVE_PROJECT,
      });
      router.refresh();
    }
    if (error) {
      openToast({ variant: 'error', message: error });
    }
  }, [projectId, openToast, router, setModalState]);

  const handleRemoveProject = useCallback(async () => {
    setLoading(true);
    const { success, error } = await removeProjectById(projectId);
    setLoading(false);
    setModalState(false);
    if (success) {
      openToast({
        variant: 'success',
        message: SUCCESS_MESSAGES.REMOVE_PROJECT,
      });
      router.push(ROUTES.ADMIN_BOARDS);
    }
    if (error) {
      openToast({ variant: 'error', message: error });
    }
  }, [projectId, openToast, router, setModalState]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={setModalState}
      title="Remove Project?"
      customClass={{
        modalWrappper: 'max-w-screen-sm top-40',
      }}
    >
      <div className="flex flex-row gap-10 w-full justify-center py-10">
        <Button
          isLoading={isLoading}
          onClick={handleArchiveProject}
          startIcon={<FaArchive className="w-5 h-5 mr-2" />}
          variant="outline"
          customClass="border hover:bg-amber-700 font-bold bg-amber-500 text-white px-4"
        >
          Archive
        </Button>
        <Button
          isLoading={isLoading}
          onClick={handleRemoveProject}
          startIcon={<FaTrash className="w-5 h-5 mr-2" />}
          variant="outline"
          customClass="border hover:bg-red-700 font-bold bg-red-500 text-white px-4"
        >
          Remove Permanently
        </Button>
      </div>
    </BaseModal>
  );
};

export const ConfirmDeleteModal = withToast(ConfirmDeleteModalBase);
