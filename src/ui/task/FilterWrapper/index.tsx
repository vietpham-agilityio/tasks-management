'use client';

// Components
import { Dropdown, MultipleSelect } from '@/components';

// Types
import { OptionType } from '@/types';

export const STATUS_OPTIONS: OptionType[] = [
  {
    name: 'Not Started',
    value: 'not_started',
  },
  {
    name: 'In Progress',
    value: 'in_progress',
  },
  {
    name: 'Done',
    value: 'done',
  },
];

export const PRIORITY_OPTIONS: OptionType[] = [
  {
    name: 'Low',
    value: 'low',
  },
  {
    name: 'Medium',
    value: 'medium',
  },
  {
    name: 'High',
    value: 'high',
  },
];

export const SORT_OPTIONS: OptionType[] = [
  {
    name: 'Desc',
    value: 'desc',
  },
  {
    name: 'Asc',
    value: 'asc',
  },
];

export const FilterWrapper = () => {
  const handleStatusOnChange = () => {};

  const handlePriorityOnChange = () => {};

  const handleSelectSort = () => {};

  return (
    <div className="mb-6">
      <div className="flex gap-2.5">
        <div className="flex flex-col gap-2.5 md:flex-row">
          <MultipleSelect
            title="Status"
            onChange={handleStatusOnChange}
            options={STATUS_OPTIONS}
          />
          <MultipleSelect
            title="Priority"
            onChange={handlePriorityOnChange}
            options={PRIORITY_OPTIONS}
          />
        </div>
        <Dropdown
          placeholder="Sort"
          customClass={{
            placeholder: 'text-black',
            button: 'pb-[11px] pt-3 px-5',
          }}
          options={SORT_OPTIONS}
          onSelect={handleSelectSort}
        />
      </div>
    </div>
  );
};
