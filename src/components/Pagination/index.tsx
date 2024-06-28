'use client';
import React, { ReactNode, useCallback, useMemo } from 'react';

// Components
import { Button } from '../Button';

// Icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

// Utils
import { cn, getNumRange } from '@/utils';

type PaginationProps = {
  total: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'primary' | 'outline';
  customClass?: {
    wrapper?: string;
    button?: string;
  };
  onChangePageNumber: (value: number) => void;
};

const LEFT_DOTS = 'left-dots';
const RIGHT_DOTS = 'right-dots';

export const Pagination = ({
  total,
  currentPage,
  pageSize,
  siblingCount = 2,
  startIcon = <FaArrowLeft />,
  endIcon = <FaArrowRight />,
  variant = 'outline',
  customClass,
  onChangePageNumber,
}: PaginationProps) => {
  const buttonBaseClass = 'text-black rounded-lg flex justify-center';

  const totalPageCount = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize],
  );

  const firstPageIndex = 1;
  const secondPageIndex = 2;
  const lastPageIndex = totalPageCount;
  const secondLastPageIndex = totalPageCount - 1;

  const paginationRange = useMemo(() => {
    const startIndex = Math.max(currentPage - siblingCount, secondPageIndex);
    const endIndex = Math.min(currentPage + siblingCount, secondLastPageIndex);
    const middleRange: Array<number | string> = getNumRange(
      startIndex,
      endIndex,
    );
    if (currentPage - siblingCount > secondPageIndex) {
      middleRange.unshift(LEFT_DOTS);
    }
    if (currentPage + siblingCount < secondLastPageIndex) {
      middleRange.push(RIGHT_DOTS);
    }
    return middleRange;
  }, [secondPageIndex, secondLastPageIndex, siblingCount, currentPage]);

  const hasPrevious = useMemo(() => currentPage > 1, [currentPage]);
  const hasNext = useMemo(
    () => currentPage * pageSize < total,
    [currentPage, pageSize, total],
  );

  const handleClickNext = useCallback(() => {
    onChangePageNumber(currentPage + 1);
  }, [onChangePageNumber, currentPage]);

  const handleClickPrevious = useCallback(() => {
    onChangePageNumber(currentPage - 1);
  }, [onChangePageNumber, currentPage]);

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      onChangePageNumber(pageNumber);
    },
    [onChangePageNumber],
  );

  if (total === 0 || currentPage <= 0) {
    return null;
  }

  return (
    <div
      className={cn('flex flex-row items-center gap-3', customClass?.wrapper)}
    >
      <Button
        variant={variant}
        customClass={cn(
          buttonBaseClass,
          'px-3',
          variant === 'primary' && 'text-white',
          !hasPrevious && 'bg-zinc-300',
          customClass?.button,
        )}
        onClick={handleClickPrevious}
        disabled={!hasPrevious}
        startIcon={startIcon}
      >
        Previous
      </Button>

      <Button
        customClass={cn(
          buttonBaseClass,
          'w-10 h-10 hidden md:block',
          variant === 'primary' && 'text-white',
          currentPage === firstPageIndex && 'bg-zinc-300',
          customClass?.button,
        )}
        variant={variant}
        onClick={() => handleChangePage(firstPageIndex)}
      >
        {firstPageIndex}
      </Button>
      {paginationRange.map((page) => {
        if (typeof page === 'string' && page.includes('dots')) {
          return (
            <span className="hidden md:block" key={`page-number-${page}`}>
              &#8230;
            </span>
          );
        }
        return (
          <Button
            customClass={cn(
              buttonBaseClass,
              'w-10 h-10 hidden md:block',
              variant === 'primary' && 'text-white',
              currentPage === Number(page) && 'bg-zinc-300',
              customClass?.button,
            )}
            variant={variant}
            key={`page-number-${page}`}
            onClick={() => handleChangePage(Number(page))}
          >
            {page}
          </Button>
        );
      })}
      <Button
        customClass={cn(
          buttonBaseClass,
          'w-10 h-10 hidden md:block',
          variant === 'primary' && 'text-white',
          currentPage === lastPageIndex && 'bg-zinc-300',
          customClass?.button,
        )}
        variant={variant}
        onClick={() => handleChangePage(lastPageIndex)}
      >
        {lastPageIndex}
      </Button>
      <Button
        variant={variant}
        customClass={cn(
          buttonBaseClass,
          'px-3',
          variant === 'primary' && 'text-white',
          customClass?.button,
        )}
        onClick={handleClickNext}
        disabled={!hasNext}
        endIcon={endIcon}
      >
        Next
      </Button>
    </div>
  );
};
