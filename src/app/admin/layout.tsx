import { ReactNode } from 'react';

// Components
import { AdminNavBar } from '@/components';

const AdminLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <div className="grid grid-flow-row md:grid-flow-col md:gap-8">
    <div className="row-auto md:col-span-1">
      <AdminNavBar />
    </div>
    <div className="row-auto md:col-span-11">{children}</div>
  </div>
);

export default AdminLayout;
