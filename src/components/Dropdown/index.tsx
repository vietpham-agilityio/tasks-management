'use client';
import { RefObject, useEffect, useRef, useState } from 'react';

// Icons
import { GoChevronDown } from 'react-icons/go';

// Components
import { Button } from '@/components';

// Hooks
import { useOutsideClick } from '@/hooks';

// Utils
import { cn } from '@/utils';

// Types
import { OptionType } from '@/types';

type DropdownProps = {
  placeholder?: string;
  options: OptionType[];
  disabled?: boolean;
  selectedItemValue?: string;
  customClass?: {
    button?: string;
    placeholder?: string;
  };
  onSelect: (id: string) => void;
  onBlur?: () => void;
};

export const Dropdown = ({
  placeholder = 'Dropdown',
  options = [],
  disabled = false,
  selectedItemValue,
  customClass,
  onSelect,
  onBlur,
}: DropdownProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const [selectedValue, setSelectedValue] = useState(selectedItemValue);

  const listRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current && isOpenDropdown) {
      const targetIndex = options.findIndex(
        (item) => item.value === selectedValue,
      );
      if (targetIndex !== -1) {
        const selectedOption = listRef.current?.children[targetIndex];
        if (selectedOption) {
          selectedOption.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
    }
  }, [selectedValue, listRef, isOpenDropdown, options]);

  const handleToggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleChangeDropdown = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpenDropdown(false);
    onBlur?.();
  };

  const renderTitle = () => {
    const selectedOption = options.find(({ value }) => value === selectedValue);

    return (
      <span className={cn(customClass?.placeholder)}>
        {selectedOption ? selectedOption.name : placeholder}
      </span>
    );
  };

  const dropdownRef = useOutsideClick(() => {
    setIsOpenDropdown(false);
  });

  return (
    <div
      ref={dropdownRef as RefObject<HTMLDivElement>}
      tabIndex={1}
      onBlur={onBlur}
    >
      <Button
        variant="outline"
        customClass={cn(
          'w-full p-5 bg-zinc-50 text-neutral-800 dark:text-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white flex justify-between items-center gap-2 outline outline-1 outline-zinc-300',
          !selectedValue && 'text-zinc-400',
          customClass?.button,
        )}
        onClick={handleToggleDropdown}
        endIcon={
          <GoChevronDown
            className={cn(
              'h-6 w-6 text-slate-500 transform duration-300 ease-in-out',
              {
                'rotate-180': isOpenDropdown,
              },
            )}
          />
        }
        disabled={disabled}
      >
        {renderTitle()}
      </Button>
      {isOpenDropdown && (
        <div
          className="absolute z-20 transform duration-300 ease-in-out bg-white text-neutral-800 dark:text-white dark:bg-neutral-900 overflow-y-auto max-h-40"
          style={{
            width: dropdownRef?.current?.clientWidth,
          }}
        >
          <ul
            className="rounded-lg border border-gray-200 mt-2 "
            data-testid="options"
            ref={listRef}
          >
            {options.map((item) => {
              const { value, name } = item;

              return (
                <li
                  key={item.value}
                  className={cn(
                    'flex items-center cursor-pointer hover:bg-gray-200 p-3 rounded-lg dark:hover:bg-neutral-800',
                    {
                      'bg-gray-300 dark:bg-neutral-700':
                        selectedValue === value,
                    },
                  )}
                  value={value}
                  onClick={() => handleChangeDropdown(value)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
