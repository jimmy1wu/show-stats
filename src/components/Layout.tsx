import React, { PropsWithChildren } from "react";
import { Header } from ".";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-inter">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
