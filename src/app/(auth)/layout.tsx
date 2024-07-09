import { ReactNode } from 'react';

// Components
import { PublicNavBar } from '@/components';

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <div className="grid grid-flow-row lg:grid-cols-12 lg:gap-8">
    <div className="row-auto lg:col-span-2">
      <PublicNavBar />
    </div>
    {/* Height - Small Screen = 100vh - 21*2 + 48 ((padding-x) * 2 + navbar ) 
    Height - Big Screen = 100vh - (padding-x) * 2  */}
    <div className="row-auto lg:col-span-10  h-[calc(100vh_-_90px)] lg:h-[calc(100vh_-_42px)] bg-white rounded-lg">
      <div className="w-full lg:w-2/3 max-w-[700px] pt-10 lg:pt-[150px] px-10 mx-auto">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
