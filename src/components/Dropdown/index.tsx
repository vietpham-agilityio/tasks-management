'use client';
import { useState } from 'react';

// Icons
import { GoChevronDown } from 'react-icons/go';

// Components
import { Button } from '@/components';

// Utils
import { cn } from '@/utils';

// Types
import { OptionType } from '@/types';

type DropdownProps = {
  title?: string;
  options: OptionType[];
  disabled?: boolean;
  selectedItemValue?: string;
  onSelect: (id: string) => void;
};

export const Dropdown = ({
  title = 'Dropdown',
  options = [],
  disabled = false,
  selectedItemValue,
  onSelect,
}: DropdownProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const [selectedValue, setSelectedValue] = useState(selectedItemValue);

  const handleToggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleChangeDropdown = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpenDropdown(false);
  };

  const renderTitle = () => {
    const selectedOption = options.find(({ value }) => value === selectedValue);

    return <span>{selectedOption ? selectedOption?.name : title}</span>;
  };

  return (
    <div className="relative">
      <div className="relative w-full">
        <Button
          variant="outline"
          customClass="w-full p-4 bg-white text-neutral-800 dark:text-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white flex justify-between items-center gap-2"
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
      </div>
      {isOpenDropdown && (
        <div className="transform duration-300 ease-in-out bg-white text-neutral-800 dark:text-white dark:bg-neutral-900">
          <ul
            className="rounded-lg border border-gray-200 mt-2"
            data-testid="options"
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
