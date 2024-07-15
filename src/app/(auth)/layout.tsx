import { ReactNode } from 'react';

// Components
import { PublicNavBar } from '@/components';

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <div className="grid grid-flow-row lg:grid-cols-12 gap-8">
    <div className="row-auto lg:col-span-2">
      <PublicNavBar />
    </div>
    <div className="row-auto lg:col-span-10 bg-white dark:bg-zinc-800 rounded-lg">
      <div className="w-full lg:w-2/3 py-10 lg:py-20 px-10 mx-auto">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
