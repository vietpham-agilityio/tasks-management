import { ReactNode } from 'react';
import type { Metadata } from 'next';

// Components
import { PublicNavBar } from '@/components';

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

const PublicLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <div className="grid grid-flow-row md:grid-flow-col md:gap-8">
    <div className="row-auto md:col-span-1">
      <PublicNavBar />
    </div>
    <div className="row-auto md:col-span-11">{children}</div>
  </div>
);

export default PublicLayout;
