'use client';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Components
import { NavLink } from '../NavLink';

// Constants
import {
  ADMIN_NAVIGATION_LIST,
  PUBLIC_NAVIGATION_LIST,
  ROUTES,
} from '@/constants';

// Icons
import { LogoIcon } from '@/icons';
import { CiMenuBurger } from 'react-icons/ci';

// Models
import { Navigation } from '@/models';

// Utils
import { cn } from '@/utils';

export const NavBar = () => {
  const pathName = usePathname();
  const [isShowNavBar, setShowNavBar] = useState(true);

  // TODO: Update to check if is admin
  const isAdmin = false;

  const navigationList: Navigation[] = useMemo(
    () => (isAdmin ? ADMIN_NAVIGATION_LIST : PUBLIC_NAVIGATION_LIST),
    [isAdmin],
  );

  const homeRoute = useMemo(
    () => (isAdmin ? ROUTES.ADMIN_BOARDS : ROUTES.BOARDS),
    [isAdmin],
  );

  const toggleShowNavBar = () => {
    setShowNavBar(!isShowNavBar);
  };

  return (
    <nav className="relative lg:static">
      <div className="flex items-center justify-between py-[10px] mr-5 px-[5px] mb-[31px] rounded-lg bg-white dark:bg-zinc-800 ">
        <Link href={homeRoute} className="flex items-center gap-2">
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
          'rounded-lg bg-white dark:bg-zinc-800 px-[19px] pb-9 w-full absolute lg:static lg:block',
          !isShowNavBar && 'hidden',
        )}
      >
        <span className="text-xs pb-2 font-bold text-zinc-500 dark:text-white ">
          Menu
        </span>
        <div className="flex flex-col gap-6">
          {navigationList.map((route) => {
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
        </div>
      </div>
    </nav>
  );
};
