import { ChangeEventHandler } from 'react';
import clsx from 'clsx';

type InputProps = {
  variant?: 'primary' | 'outline' | 'fill';
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  customClass?: string;
  disabled?: boolean;
};

export const Input = ({
  variant = 'primary',
  value = '',
  onChange,
  placeholder = 'Type here',
  disabled = false,
  customClass,
}: InputProps) => {
  const baseClass =
    'p-4 border border-zinc-300 focus:outline focus:outline-zinc-300 rounded-lg w-full dark:border-gray-700 dark:focus:outline-gray-700 dark:focus:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(
        baseClass,
        {
          'bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-white':
            variant === 'primary',
          'bg-transparent text-zinc-500 dark:text-white': variant === 'outline',
          'bg-white text-neutral-800 dark:text-white dark:bg-neutral-900':
            variant === 'fill',
        },
        customClass,
      )}
      disabled={disabled}
    />
  );
};
