import { ReactNode } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => <div className="h-full flex flex-col">{children}</div>;

export default Layout;
