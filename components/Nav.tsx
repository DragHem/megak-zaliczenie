import React from "react";
import Avatar from "./Avatar";
import { signOut, useSession } from "next-auth/react";
import Button from "./common/Button";
import RegisterLoginButtons from "./RegisterLoginButtons";
import NavIcon from "./NavIcon";

const Nav = () => {
  const { data } = useSession();

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <NavIcon />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
          >
            <li>
              <a>Strona główna</a>
            </li>
            <li>
              <a>O nas</a>
            </li>
            {!data && <RegisterLoginButtons />}
            {data && (
              <Button primary onClick={() => signOut()}>
                Wyloguj
              </Button>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Kitty</a>
      </div>
      <div className="navbar-end">
        {data && <Avatar avatarLink={data && data.user.image} />}
      </div>
    </div>
  );
};

export default Nav;
