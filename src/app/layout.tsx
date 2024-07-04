import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

// Utils
import { cn } from '@/utils';

const manRope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Management',
  description: 'Application to manage task built by NextJS',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(manRope.className, 'bg-zinc-50 px-6 my-[21px]')}>
        {children}
      </body>
    </html>
  );
}
