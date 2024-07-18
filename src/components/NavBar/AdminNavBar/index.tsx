'use client';
import { RefObject, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// APIs
import { logout } from '@/actions';

// Components
import { Button, NavLink, ToggleTheme } from '@/components';

// Constants
import { ADMIN_NAVIGATION_LIST, ROUTES, SUCCESS_MESSAGES } from '@/constants';

// HOCs
import { TWithToast, withToast } from '@/hocs';

// Hooks
import { useOutsideClick } from '@/hooks';

// Icons
import { LogoIcon } from '@/icons';
import { CiMenuBurger } from 'react-icons/ci';
import { FaSignOutAlt } from 'react-icons/fa';

// Utils
import { cn } from '@/utils';

const AdminNavBarBase = ({ openToast }: TWithToast<object>) => {
  const pathName = usePathname();
  const [isShowNavBar, setShowNavBar] = useState(false);

  const toggleShowNavBar = () => {
    setShowNavBar(!isShowNavBar);
  };

  const handleCloseNavBar = () => {
    setShowNavBar(false);
  };

  const navBarRef = useOutsideClick(() => {
    handleCloseNavBar();
  });

  const handleSignOut = async () => {
    await logout();
    openToast({
      variant: 'primary',
      message: SUCCESS_MESSAGES.SIGNED_OUT,
    });
  };

  return (
    <>
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
            'mt-2 rounded-lg bg-white dark:bg-zinc-800 px-3 py-4 w-full absolute lg:static lg:block z-50',
            !isShowNavBar && 'hidden',
          )}
        >
          <span className="text-xs pb-2 font-bold text-zinc-500 dark:text-white ">
            Menu
          </span>
          <div className="flex flex-col gap-4 mt-2">
            {ADMIN_NAVIGATION_LIST.map((route) => {
              const { href, label } = route;
              const isActivePath = pathName.includes(href);
              return (
                <NavLink
                  key={`nav-link-${label}`}
                  isActive={isActivePath}
                  {...route}
                  onClick={handleCloseNavBar}
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
          <div className="mt-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-white">
              Theme
            </span>
            <ToggleTheme />
          </div>
        </div>
      </nav>
      {isShowNavBar && (
        <div className="opacity-50 fixed inset-0 z-40 bg-black lg:hidden" />
      )}
    </>
  );
};

export const AdminNavBar = withToast(AdminNavBarBase);
