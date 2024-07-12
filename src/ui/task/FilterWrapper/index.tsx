'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Components
import { Dropdown, MultipleSelect } from '@/components';

// Types
import { OptionType } from '@/types';

// Constants
import { SEARCH_PARAMS } from '@/constants';

// Utils
import { getQueryParams } from '@/utils';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [_, startTransition] = useTransition();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  // store the current query parameters
  const page = searchParams.get('page') || '';

  const handleStatusOnChange = () => {};

  const handlePriorityOnChange = () => {};

  const handleSelectSort = useCallback(
    (sortBy: string) => {
      params.set(SEARCH_PARAMS.SORT_BY, sortBy);

      startTransition(() => {
        router.push(getQueryParams({ page, sortBy }));
      });
    },
    [params, router, page],
  );

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
