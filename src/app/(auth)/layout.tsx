import { ReactNode } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <div className="w-full h-full bg-white rounded-lg">
    <div className="w-full md:w-2/3 max-w-[700px] pt-10 lg:pt-[150px] px-10 mx-auto ">
      {children}
    </div>
  </div>
);

export default Layout;
