import React from "react";
import { LayoutDTO } from "types/layout";

const Layout: React.FC<LayoutDTO> = ({ children }) => {
  return (
    <div className="overflow-hidden bg-[#111111]">
      <div className="h-full w-full max-h-full flex justify-center">
        <main className="max-w-[390px] w-full h-screen overflow-y-auto overflow-x-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
