import React from "react";
import usePost from "../../../../hooks/usePost";

interface Props {
  id: string;
  name: string;
  nickname: string;
  email: string;
}

const PendingOutgoingRow = ({ name, nickname, email, id }: Props) => {
  const [_, call] = usePost("/api/user/invites/outgoing");

  const cancelHandler = (id: string) => {
    call({ id });
  };

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
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => cancelHandler(id)}
        >
          Anuluj
        </button>
      </td>
    </tr>
  );
};

export default PendingOutgoingRow;
