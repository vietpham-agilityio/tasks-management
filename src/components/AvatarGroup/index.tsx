// Components
import { Avatar } from '@/components';

// Types
import { User } from '@/types';

type AvatarGroupProps = {
  listUsers: User[];
  maxDisplayed?: number;
};

export const AvatarGroup = ({
  listUsers,
  maxDisplayed = 0,
}: AvatarGroupProps) => {
  const itemsToShow = listUsers.slice(0, maxDisplayed || listUsers.length);
  const remainingItems = listUsers.length - itemsToShow.length;

  return (
    <div className="flex -space-x-4" data-testid="avatar-group">
      {itemsToShow.map(({ id, avatar, name }) => {
        return (
          <div key={id}>
            <Avatar
              src={avatar}
              name={name}
              customClass="border-white border-2"
              variant="circle"
            />
          </div>
        );
      })}

      {remainingItems > 0 && (
        <div className="w-12 h-12 border-2 border-white bg-gray-300 rounded-full flex items-center justify-center">
          <span>&#43;{remainingItems}</span>
        </div>
      )}
    </div>
  );
};
