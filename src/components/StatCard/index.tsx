import { ReactNode } from 'react';
import Link from 'next/link';

// Types
import { VariantType } from '@/types';

// Utils
import { cn } from '@/utils';

type StatCardProps = {
  to: string;
  icon: ReactNode;
  label: string;
  description: string;
  variant?: VariantType;
  customClass?: {
    wrapper?: string;
    icon?: string;
    title?: string;
    desciption?: string;
  };
};

export const StatCard = ({
  to,
  icon,
  label,
  description,
  variant = 'primary',
  customClass,
}: StatCardProps) => {
  return (
    <Link href={to}>
      <div
        data-testid="statCard"
        className={cn(
          'flex flex-col rounded-lg pl-[12.5px] pr-[21.5px] py-[11px]',
          {
            'bg-sky-100': variant === 'primary',
            'bg-indigo-100': variant === 'secondary',
            'bg-violet-200': variant === 'tertiary',
            'bg-yellow-100': variant === 'warning',
            'bg-rose-200': variant === 'error',
            'bg-lime-100': variant === 'success',
          },
          customClass?.wrapper,
        )}
      >
        <div
          className={cn(
            'rounded-full w-fit p-2 mb-[15px] text-white',
            {
              'bg-neutral-300': variant === 'primary',
              'bg-indigo-500': variant === 'secondary',
              'bg-fuchsia-700': variant === 'tertiary',
              'bg-amber-300': variant === 'warning',
              'bg-red-500': variant === 'error',
              'bg-lime-500': variant === 'success',
            },
            customClass?.icon,
          )}
        >
          {icon}
        </div>
        <h1
          className={cn('text-sm text-zinc-600 truncate', customClass?.title)}
        >
          {label}
        </h1>
        <span
          className={cn(
            'text-neutral-800 font-bold text-[24px] truncate',
            customClass?.desciption,
          )}
        >
          {description}
        </span>
      </div>
    </Link>
  );
};
