import { ReactNode } from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => <div className="h-full">{children}</div>;

export default Layout;
