import { ChangeEventHandler } from 'react';

// Icons
import { BsStars } from 'react-icons/bs';
import { PiBell } from 'react-icons/pi';

// Components
import { Avatar, Button, SearchInput } from '@/components';

type HeaderProps = {
  avatarUrl?: string;
  name: string;
  handleSearch: ChangeEventHandler<HTMLInputElement>;
};

export const Header = ({ avatarUrl, handleSearch, name }: HeaderProps) => (
  <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-zinc-800 rounded-lg">
    <SearchInput onChange={handleSearch} />
    <Button customClass="flex-none p-4" startIcon={<BsStars />}>
      Create New Task
    </Button>
    <Button customClass="p-4" variant="outline">
      <PiBell className="w-6 h-6" />
    </Button>
    <Avatar width={56} height={56} src={avatarUrl} name={name} />
  </div>
);
