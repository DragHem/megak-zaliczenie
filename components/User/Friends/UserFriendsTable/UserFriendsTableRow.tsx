import React from "react";
import { useRouter } from "next/router";

interface Props {
  id: string;
  name: string;
  email: string;
  image: string | null;
  nickname: string;
}

const UserFriendsTableRow = ({ id, name, nickname, image, email }: Props) => {
  const router = useRouter();

  const removeHandler = async (id: string) => {
    await fetch(`/api/user/friends/${id}`, {
      method: "DELETE",
    });

    router.reload();
  };

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={image || "/avatar-placeholder.webp"}
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
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => removeHandler(id)}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
};

export default UserFriendsTableRow;
