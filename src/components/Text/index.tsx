import type { ReactNode } from 'react';

// Utils
import { cn } from '@/utils';

type TextProps = {
  value: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'warning'
    | 'error'
    | 'success'
    | 'active';
  icon?: ReactNode;
  customClass?: string;
};

export const Text = ({
  value,
  variant = 'primary',
  icon,
  customClass,
}: TextProps) => {
  const baseClass = 'w-fit flex items-center gap-1 px-2 py-1';

  return (
    <div
      className={cn(
        baseClass,
        {
          'fill-black text-black': variant === 'primary',
          'fill-blue-950 text-blue-950': variant === 'secondary',
          'fill-indigo-500 text-indigo-500': variant === 'tertiary',
          'fill-purple-600 text-purple-600': variant === 'quaternary',
          'fill-red-600 text-red-600': variant === 'error',
          'fill-sky-700 text-sky-700': variant === 'active',
          'fill-amber-400 text-amber-400': variant === 'warning',
          'fill-green-700 text-green-700': variant === 'success',
        },
        customClass,
      )}
    >
      {icon}
      {value}
    </div>
  );
};
