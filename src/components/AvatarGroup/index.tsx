// Components
import { Avatar } from '@/components';

// Types
import { Participation } from '@/models';

type AvatarGroupProps = {
  listUsers: Participation[];
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
      {itemsToShow.map(({ userId, name, avatar }) => {
        return (
          <div key={userId}>
            <Avatar
              src={avatar || ''}
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
