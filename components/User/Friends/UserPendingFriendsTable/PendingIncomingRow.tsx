import React from "react";
import usePost from "../../../../hooks/usePost";
import { useRouter } from "next/router";

interface Props {
  id: string;
  name: string;
  nickname: string;
  email: string;
}

const PendingIncomingRow = ({ name, nickname, email, id }: Props) => {
  const router = useRouter();
  const [_, call] = usePost("/api/user/invites/incoming");

  const acceptHandler = (id: string) => {
    call({ id, type: "ACCEPT" });
    router.reload();
  };

  const rejectHandler = (id: string) => {
    call({ id, type: "REJECT" });
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
          onClick={() => acceptHandler(id)}
        >
          Akceptuj
        </button>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => rejectHandler(id)}
        >
          Odrzuć
        </button>
      </td>
    </tr>
  );
};

export default PendingIncomingRow;
