'use client';

import { RefObject, useState } from 'react';

// Icons
import { RxCross2 } from 'react-icons/rx';

// Utils
import { cn } from '@/utils';

// Hooks
import { useOutsideClick } from '@/hooks';

// Types
import { CustomClassType, OptionType } from '@/types';

// icons
import { FilterIcon, SelectIcon } from '@/icons';

type MultipleSelectProps = {
  title?: string;
  options: OptionType[];
  selectedOptions?: string[];
  disabled?: boolean;
  onChange: (ids: string[]) => void;
  onBlur?: () => void;
} & CustomClassType;

export const MultipleSelect = ({
  title,
  options,
  selectedOptions = [],
  disabled = false,
  customClass,
  onChange,
  onBlur,
}: MultipleSelectProps) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [selectedData, setSelectedData] = useState<string[]>(selectedOptions);

  const handleSelect = (id: string) => {
    const newValue = [...selectedData, id];
    setSelectedData(newValue);
  };

  const handleRemove = (id: string) => {
    const newValue = [...selectedData.filter((it) => it !== id)];
    setSelectedData(newValue);
  };

  const filteredOptions = options.filter(
    (item) => !selectedData.includes(item.value!),
  );

  const filteredSelectedOptions = options.filter((item) =>
    selectedData.includes(item.value),
  );

  const showOptions = () => {
    !disabled && setIsOpenOptions(true);
  };

  const dropdownRef = useOutsideClick(() => {
    setIsOpenOptions(false);
    onChange(selectedData);
    onBlur?.();
  });

  return (
    <>
      <div
        className={cn(
          'w-full rounded-lg border border-zinc-300  bg-zinc-50 text-neutral-800 dark:text-white dark:bg-neutral-900 dark:outline-gray-800',
          {
            'outline outline-1 outline-zinc-300': isOpenOptions,
            'cursor-not-allowed': disabled,
            'w-auto': title,
          },
          customClass,
        )}
        tabIndex={1}
        onClick={showOptions}
        onBlur={onBlur}
        ref={dropdownRef as RefObject<HTMLDivElement>}
        data-testid="multiple-select"
      >
        {filteredSelectedOptions.length > 0 && (
          <div className="bg-transparent w-full px-2">
            <div
              className={cn(
                'w-full flex flex-wrap	gap-2',
                title ? 'py-[5px]' : 'py-[14px]',
              )}
            >
              {filteredSelectedOptions.map(({ value, name }: OptionType) => (
                <span
                  key={value}
                  className={`flex items-center border border-zinc-300 rounded-lg bg-gray-200 p-2 text-sm dark:text-white dark:bg-neutral-700`}
                >
                  {name}
                  <button
                    name="members"
                    className="ml-2 pl-2 border-l border-zinc-300 cursor-pointer dark:border-white disabled:cursor-not-allowed"
                    onClick={() => handleRemove(value!)}
                    data-testid={`multiple-select-${value}`}
                    disabled={disabled}
                  >
                    <RxCross2 />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="relative w-full focus:outline-2 focus:outline-blue-500 focus:border-none">
          {filteredSelectedOptions.length === 0 &&
            (title ? (
              <div className="flex items-center py-3 px-5 gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <FilterIcon />
                </div>
                <p className="text-black dark:text-white">{title}</p>
                <div className="w-5 h-5 flex items-center justify-center">
                  <SelectIcon />
                </div>
              </div>
            ) : (
              <p className="p-5 opacity-50">Select options</p>
            ))}
          {isOpenOptions && filteredOptions.length > 0 && (
            <div
              className="absolute w-full px-2 pb-2 bg-zinc-50 dark:bg-neutral-900 rounded-lg border border-zinc-300 outline outline-1 outline-zinc-300 overflow-y-auto max-h-48"
              data-testid="options"
            >
              {filteredOptions.map(({ value, name }: OptionType) => (
                <div
                  key={value}
                  onClick={() => handleSelect(value!)}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-200 hover:rounded cursor-pointer dark:hover:bg-neutral-800"
                  data-testid={`option-${value}`}
                >
                  <span>{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
