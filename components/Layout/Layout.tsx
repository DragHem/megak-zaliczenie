import React from "react";

import LayoutDrawer from "./LayoutDrawer";
import Nav from "../Nav/Nav";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Nav />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
      <LayoutDrawer />
    </div>
  );
};

export default Layout;
