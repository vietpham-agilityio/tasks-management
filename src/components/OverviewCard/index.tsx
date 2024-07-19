'use client';

import Link from 'next/link';

import { RxCross2 } from 'react-icons/rx';

// Components
import ImageWithFallback from '../ImageWithFallback';

// Utils
import { cn } from '@/utils';

type OverviewCardProps = {
  href: string;
  title: string;
  description: string;
  helperText?: string;
  imageSrc?: string;
  time?: string;
  isRowDisplay?: boolean;
  hasDeleteButton?: boolean;
  badge?: React.ReactNode;
  avatarSrc?: string;
  customClass?: {
    wrapper?: string;
    image?: string;
    title?: string;
    time?: string;
    description?: string;
    helperText?: string;
    avatar?: string;
  };
  onClickDelete?: () => void;
};

export const OverviewCard = ({
  href,
  title,
  description,
  helperText,
  imageSrc,
  time,
  isRowDisplay = false,
  hasDeleteButton = false,
  badge,
  avatarSrc,
  customClass,
  onClickDelete,
}: OverviewCardProps) => {
  return (
    <div className="relative group ">
      {hasDeleteButton && (
        <div
          className="absolute w-4 h-4 text-gray-400 -top-1.5 -right-1 rounded-full cursor-pointer z-10 hidden group-hover:block hover:bg-red-500 hover:text-white"
          onClick={onClickDelete}
        >
          <RxCross2 />
        </div>
      )}

      <Link
        href={href}
        className={cn(
          'flex flex-col border rounded-lg p-5 dark:bg-zinc-800 dark:border-gray-700',
          imageSrc && 'gap-4',
          isRowDisplay && 'md:flex-row md:gap-4',
          customClass?.wrapper,
        )}
      >
        <div
          className={cn(
            'relative block bg-zinc-200 rounded-lg',
            imageSrc && 'aspect-video',
            isRowDisplay && 'flex-1 md:basis-2/5',
            customClass?.image,
          )}
        >
          {imageSrc && (
            <ImageWithFallback
              src={imageSrc}
              alt={title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 766px) 80vw,
              (min-width: 768px) and (max-width: 1023px) 33vw,
              (min-width: 1024px) 25vw"
              style={{ borderRadius: '8px' }}
            />
          )}
        </div>
        <div
          className={cn(
            'flex flex-1 flex-col gap-1 dark:text-white min-w-0',
            isRowDisplay && 'md:basis-3/5',
          )}
        >
          <div className="flex items-center gap-2">
            {badge}
            <div
              className={cn(
                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold rounded-sm w-fit px-1 text-[10px] text-white truncate',
                customClass?.helperText,
              )}
            >
              {helperText}
            </div>
          </div>
          <div className="flex justify-between items-center ">
            <div
              className={cn('text-md font-bold truncate', customClass?.title)}
            >
              {title}
            </div>
            {time && (
              <div
                className={cn(
                  'font-normal text-xs text-zinc-500 dark:text-zinc-400',
                  customClass?.time,
                )}
              >
                {time}
              </div>
            )}
          </div>
          <div
            className={cn(
              'text-xs text-zinc-500 dark:text-white truncate',
              !isRowDisplay && 'pt-3',
              customClass?.description,
            )}
          >
            {description}
          </div>
          {avatarSrc && (
            <div className="flex justify-end pt-3">
              <div className={cn('relative w-6 h-6', customClass?.avatar)}>
                <ImageWithFallback
                  src={avatarSrc}
                  alt="avatar"
                  fill
                  sizes="24px"
                  style={{
                    borderRadius: '100%',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
