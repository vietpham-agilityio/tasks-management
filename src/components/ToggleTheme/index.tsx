'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Icons
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

// Components
import { Button } from '@/components';

// Constants
import { THEME_MODE } from '@/constants';

export const ToggleTheme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const themeMode = resolvedTheme === THEME_MODE.DARK;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleTheme = () => {
    setTheme(themeMode ? THEME_MODE.LIGHT : THEME_MODE.DARK);
  };

  if (!isMounted)
    return (
      <Button
        customClass="w-full dark:hover:bg-neutral-800 dark:hover:text-white"
        variant="outline"
        startIcon={<AiOutlineLoading className="animate-spin" />}
        customIconClass="px-2 disabled:hover-none"
        disabled={!isMounted}
      >
        Light/Dark
      </Button>
    );

  return (
    <Button
      customClass="w-full dark:hover:bg-neutral-800 dark:hover:text-white"
      variant="outline"
      onClick={handleToggleTheme}
      startIcon={
        resolvedTheme === THEME_MODE.DARK ? (
          <MdOutlineLightMode />
        ) : (
          <MdOutlineNightlight />
        )
      }
      customIconClass="px-2"
    >
      <span>{resolvedTheme === THEME_MODE.DARK ? 'Light' : 'Dark'}</span>
    </Button>
  );
};
