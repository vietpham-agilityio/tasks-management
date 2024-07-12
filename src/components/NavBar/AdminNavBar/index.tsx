'use client';
import { RefObject, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Components
import { Button, NavLink, ToggleTheme } from '@/components';

// Constants
import { ADMIN_NAVIGATION_LIST, ROUTES } from '@/constants';

// Hooks
import { useOutsideClick } from '@/hooks';

// Icons
import { LogoIcon } from '@/icons';
import { CiMenuBurger } from 'react-icons/ci';
import { FaSignOutAlt } from 'react-icons/fa';

// Utils
import { cn } from '@/utils';

export const AdminNavBar = () => {
  const pathName = usePathname();
  const [isShowNavBar, setShowNavBar] = useState(true);

  const toggleShowNavBar = () => {
    setShowNavBar(!isShowNavBar);
  };

  const navBarRef = useOutsideClick(() => {
    setShowNavBar(false);
  });

  // TODO: Handle Sign Out
  const handleSignOut = () => {};

  return (
    <nav
      className="relative lg:static w-full"
      ref={navBarRef as RefObject<HTMLDivElement>}
    >
      <div className="flex items-center justify-between py-[10px] pr-5 lg:pr-0 px-[5px] lg:mb-[31px] rounded-lg bg-white dark:bg-zinc-800 ">
        <Link
          href={ROUTES.ADMIN_BOARDS}
          className="flex items-center gap-2 w-full"
        >
          <LogoIcon customClass="w-5 h-5" />
          <h1 className="text-xl font-bold dark:text-white">Taskboard</h1>
        </Link>
        <CiMenuBurger
          className="lg:hidden cursor-pointer"
          onClick={toggleShowNavBar}
        />
      </div>
      <div
        className={cn(
          'rounded-lg bg-white dark:bg-zinc-800 px-[19px] pb-9 pt-[15px] w-full absolute lg:static lg:block',
          !isShowNavBar && 'hidden',
        )}
      >
        <span className="text-xs pb-2 font-bold text-zinc-500 dark:text-white ">
          Menu
        </span>
        <div className="flex flex-col gap-6">
          {ADMIN_NAVIGATION_LIST.map((route) => {
            const { href, label } = route;
            const isActivePath = pathName.includes(href);
            return (
              <NavLink
                key={`nav-link-${label}`}
                isActive={isActivePath}
                {...route}
              />
            );
          })}
          <Button
            variant="outline"
            customClass="gap-2 px-4 hover:bg-black hover:text-white hover:fill-white hover:font-bold text-zinc-500 fill-zinc-500 dark:text-white dark:fill-white border-none"
            onClick={handleSignOut}
            startIcon={<FaSignOutAlt className="w-4 h-4" />}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <ToggleTheme />
      </div>
    </nav>
  );
};
