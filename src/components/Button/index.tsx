import { type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline';
  customClass?: string;
  customIconClass?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  startIcon,
  endIcon,
  type = 'button',
  variant = 'primary',
  customClass = '',
  customIconClass = '',
  name,
  value,
  ariaLabel,
  disabled,
  onClick,
}: ButtonProps) => {
  const baseClass =
    'flex items-center rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-50';
  let stateClass = '';

  switch (variant) {
    case 'primary':
      stateClass =
        'bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-black dark:hover:opacity-70';
      break;
    case 'outline':
      stateClass =
        'border border-gray-200 hover:bg-gray-100 bg-transparent text-black dark:border-white dark:hover:bg-zinc-100 dark:text-white dark:hover:text-black';
      break;

    default:
      break;
  }

  return (
    <button
      type={type}
      name={name}
      value={value}
      aria-label={ariaLabel}
      className={[baseClass, stateClass, customClass].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon && <div className={customIconClass}>{startIcon}</div>}
      {children}
      {endIcon && <div className={customIconClass}>{endIcon}</div>}
    </button>
  );
};
