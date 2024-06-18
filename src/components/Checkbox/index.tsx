'use client';

import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

const Checkbox = ({
  label,
  description,
  id,
  disabled,
  ...props
}: CheckboxProps) => {
  const componentId = `checkbox-${id}-${label}`;

  return (
    <div className="flex gap-3">
      <input
        {...props}
        className={twMerge(
          'accent-black dark:accent-white w-5 h-5 cursor-pointer disabled:cursor-not-allowed',
          props.className,
        )}
        disabled={disabled}
        id={componentId}
        type="checkbox"
      />
      <div className="flex flex-col">
        <label
          className={clsx(
            'text-neutral-800 dark:text-white font-bold text-sm cursor-pointer',
            disabled && 'disabled:cursor-not-allowed',
          )}
          htmlFor={componentId}
        >
          {label}
        </label>
        {description && (
          <span className="text-zinc-500 dark:text-white text-xs">
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
