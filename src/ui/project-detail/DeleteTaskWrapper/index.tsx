'use client';

import { useState } from 'react';
import { Session } from 'next-auth';

// Icons
import { ClockIcon } from '@/icons';

// Components
import { Badge, BaseModal, Button, OverviewCard } from '@/components';

// Constants
import { DATE_FORMAT, ROUTES } from '@/constants';

// Types
import { Task } from '@/models';

// Utils
import { formatDate } from '@/utils';

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

type ConfirmDeleteTaskModalProps = {
  taskId: string;
  isOpen: boolean;
  setModalState: (value: boolean) => void;
};

const ConfirmDeleteTaskModal = ({
  taskId,
  isOpen,
  setModalState,
}: ConfirmDeleteTaskModalProps) => {
  const handleDeleteTask = () => {
    //TODO: Handle delete task
    return taskId;
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
      <p className="my-6">Are you sure to delete this task?</p>
      <Button onClick={handleDeleteTask}>Delete</Button>
    </BaseModal>
  );
};
