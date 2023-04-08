import React from "react";
import NavLinks from "./NavLinks";

const NavMenu = () => {
  return (
    <div className="flex-none hidden sm:block">
      <ul className="menu menu-horizontal menu-compact rounded-xl">
        <NavLinks />
      </ul>
    </div>
  );
};

export default NavMenu;
