import React from "react";

const UserFriendsTableRow = () => {
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
            <p className="font-bold">Damian</p>
            <p className="text-sm opacity-50">DragHem</p>
          </div>
        </div>
      </td>
      <td>
        <p>pusiek99@interia.pl</p>
      </td>
      <td>
        <button className="btn btn-ghost btn-xs">Usuń</button>
      </td>
    </tr>
  );
};

export default UserFriendsTableRow;
