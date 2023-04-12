import React from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import NavIcon from "./NavIcon";
import Link from "next/link";
import NavMenu from "./NavMenu";

const Nav = () => {
  const { data } = useSession();

  return (
    <div className="navbar sticky top-0 bg-base-300">
      <div className="flex-none sm:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <NavIcon />
        </label>
      </div>
      <div className="flex-1 px-2 mx-2">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl text-primary"
        >
          Kitty
        </Link>
      </div>
      <div className="px-2 mx-2">
        {!data && <NavMenu />}
        {data && (
          <>
            <Avatar /> <NavMenu />
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
