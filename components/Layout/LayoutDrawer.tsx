import React from "react";
import NavLinks from "../Nav/NavLinks";

const LayoutDrawer = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100">
        <NavLinks />
      </ul>
    </div>
  );
};

export default LayoutDrawer;
