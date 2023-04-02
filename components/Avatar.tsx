import React from "react";

interface Props {
  avatarLink: string | null;
}

const Avatar = ({ avatarLink }: Props) => {
  const avatar = avatarLink || "/avatar-placeholder.webp";

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="avatar btn btn-ghost btn-circle">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatar} alt="User avatar" />
          </div>
        </div>
      </label>
      <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
        <li>
          <a>Strona główna</a>
        </li>
        <li>
          <a>O nas</a>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
