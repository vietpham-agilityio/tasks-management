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
    | 'success';
  icon?: ReactNode;
  customClass?: string;
};

const Text = ({ value, variant = 'primary', icon, customClass }: TextProps) => {
  const baseClass = 'w-fit flex items-center gap-1 px-2 py-1';

  return (
    <div
      className={cn(
        baseClass,
        {
          'fill-black text-black': variant === 'primary',
          'fill-blue-950 text-blue-950': variant === 'secondary',
          'fill-indigo-500 text-indigo-500': variant === 'tertiary',
          'fill-emerald-500 text-emerald-500': variant === 'quaternary',
          'fill-purple-500 text-purple-500': variant === 'warning',
          'fill-amber-400 text-amber-400': variant === 'error',
          'fill-red-500 text-red-500': variant === 'success',
        },
        customClass,
      )}
    >
      {icon}
      {value}
    </div>
  );
};

export default Text;
