'use client';

// Components
import { Button } from '@/components';

// Icons
import { AddIcon } from '@/icons';

export const AddNewMember = () => {
  // TODO: Create a modal to add new new members
  const handleOpenAddNewMember = () => {};
  return (
    <Button
      onClick={handleOpenAddNewMember}
      startIcon={<AddIcon customClass="w-5 h-5 mr-2" />}
      variant="outline"
      customClass="border-black hover:bg-zinc-300 font-bold dark:text-white"
    >
      Add new members
    </Button>
  );
};
