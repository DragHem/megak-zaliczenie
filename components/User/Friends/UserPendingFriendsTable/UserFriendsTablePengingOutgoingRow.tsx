import React from "react";

interface Props {
  name: string;
  nickname: string;
  email: string;
}

const UserFriendsTableRow = ({ name, nickname, email }: Props) => {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src="/avatar-placeholder.webp"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-sm opacity-50">{nickname}</p>
          </div>
        </div>
      </td>
      <td>
        <p>{email}</p>
      </td>
      <td>
        <button className="btn btn-ghost btn-xs">Anuluj</button>
      </td>
    </tr>
  );
};

export default UserFriendsTableRow;
