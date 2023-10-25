import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <div className="h-full w-full max-h-full flex justify-center">
        <main className="max-w-[450px] w-full h-screen overflow-y-auto overflow-x-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
