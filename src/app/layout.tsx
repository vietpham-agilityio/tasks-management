import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

// Auth
import { auth } from '@/auth';

// Components
import { AdminNavBar, PublicNavBar } from '../components';

// Utlils
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
  const session = await auth();
  const isAdmin = !!session;

  return (
    <html lang="en">
      <body className={cn(manRope.className, 'bg-zinc-50 px-6 my-[21px]')}>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:max-w-[200px]">
            {isAdmin ? <AdminNavBar /> : <PublicNavBar />}
          </div>
          {/* Height - Small Screen = 100vh - 21*2 + 48 ((padding-x) * 2 + navbar ) 
            Height - Big Screen = 100vh - (padding-x) * 2  */}
          <div className="min-w-0 w-full h-[calc(100vh_-_90px)] lg:h-[calc(100vh_-_42px)]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
