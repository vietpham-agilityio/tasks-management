import type { ReactNode } from 'react';
import clsx from 'clsx';

type BadgeProps = {
  label: string;
  theme?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'warning'
    | 'error'
    | 'success';
  icon?: ReactNode;
  customClass?: string;
};

export const Badge = ({
  label,
  theme = 'primary',
  icon,
  customClass,
}: BadgeProps) => {
  const baseClass = 'w-fit flex items-center gap-2 px-2 py-1';

  return (
    <div
      className={clsx(
        baseClass,
        {
          'bg-blue-950': theme === 'primary',
          'bg-indigo-500': theme === 'secondary',
          'bg-purple-500': theme === 'tertiary',
          'bg-amber-400': theme === 'warning',
          'bg-red-500': theme === 'error',
          'bg-emerald-500': theme === 'success',
        },
        customClass,
      )}
    >
      {icon}
      {label}
    </div>
  );
};
