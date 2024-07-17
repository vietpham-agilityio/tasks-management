'use client';

import { useState } from 'react';
import { Session } from 'next-auth';

// Icons
import { FaTrash } from 'react-icons/fa';
import { ClockIcon } from '@/icons';

// Components
import { Badge, BaseModal, Button, OverviewCard } from '@/components';

// Constants
import { DATE_FORMAT, ROUTES, SUCCESS_MESSAGES } from '@/constants';

// Types
import { Task } from '@/models';

// Utils
import { formatDate } from '@/utils';

// Actions
import { removeTask } from '@/actions';

// HOCs
import { TWithToast, withToast } from '@/hocs';

type DeleteTaskWrapperProps = {
  session: Session | null;
  task: Task;
  isLate: boolean;
};

export const DeleteTaskWrapper = ({
  session,
  task,
  isLate,
}: DeleteTaskWrapperProps) => {
  const { id, title, description, image, dueDate } = task;
  const [isOpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenDeleteModal(true);
  };

  return (
    <>
      <OverviewCard
        key={`task-${id}`}
        href={session ? ROUTES.ADMIN_TASK_DETAIL(id) : ROUTES.TASK_DETAIL(id)}
        title={title}
        description={description}
        imageSrc={image}
        hasDeleteButton={session ? true : false}
        onClickDelete={handleOpenModal}
        badge={
          <Badge
            label={formatDate(dueDate, DATE_FORMAT.Secondary)}
            icon={<ClockIcon />}
            customClass="rounded-md text-white text-sm"
            theme={isLate ? 'error' : 'success'}
          />
        }
        customClass={{
          wrapper: 'hover:bg-zinc-300 bg-white',
        }}
      />

      <ConfirmDeleteTaskModal
        isOpen={isOpenDeleteModal}
        setModalState={setOpenDeleteModal}
        taskId={id}
      />
    </>
  );
};

type ConfirmDeleteTaskProps = {
  taskId: string;
  isOpen: boolean;
  setModalState: (value: boolean) => void;
};

const ConfirmDeleteTask = ({
  taskId,
  isOpen,
  setModalState,
  openToast,
}: TWithToast<ConfirmDeleteTaskProps>) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleDeleteTask = async () => {
    setLoading(true);
    const { success, error } = await removeTask(taskId);
    setLoading(false);
    setModalState(false);
    if (success) {
      openToast({
        variant: 'success',
        message: SUCCESS_MESSAGES.REMOVE_PROJECT,
      });
    }
    if (error) {
      openToast({ variant: 'error', message: error });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={setModalState}
      title="Remove Task?"
      customClass={{
        modalWrappper: 'max-w-screen-sm top-40',
      }}
    >
      <p className="my-6">Do you want to remove this task?</p>
      <div className="w-full flex justify-end mb-2">
        <Button
          isLoading={isLoading}
          startIcon={<FaTrash className="w-5 h-5 mr-2" />}
          customClass="dark:bg-red-500"
          onClick={handleDeleteTask}
        >
          Delete
        </Button>
      </div>
    </BaseModal>
  );
};

export const ConfirmDeleteTaskModal = withToast(ConfirmDeleteTask);
