import React, { PropsWithChildren } from "react";
import { Header } from ".";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
