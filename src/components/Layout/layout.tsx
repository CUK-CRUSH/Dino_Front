import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="my-20 lg:w-2/3 lg:mx-auto xl:w-2/3 xl:mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
