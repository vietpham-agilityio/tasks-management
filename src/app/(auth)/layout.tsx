import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="pt-10 md:pt-[192px] px-10 w-full md:w-1/2 max-w-[700px] mx-auto">
      {children}
    </div>
  );
}
