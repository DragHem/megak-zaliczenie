import React from "react";
import useSWR from "swr";
import PendingIncomingRow from "./PendingIncomingRow";
import PendingOutgoingRow from "./PendingOutgoingRow";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserFriendsPendingTable = () => {
  const { data: outgoingInv } = useSWR<
    {
      id: string;
      name: string;
      nickname: string;
      email: string;
    }[]
  >("/api/user/invites/outgoing", fetcher, { refreshInterval: 1000 });

  const { data: incomingInv } = useSWR<
    {
      id: string;
      name: string;
      nickname: string;
      email: string;
    }[]
  >("/api/user/invites/incoming", fetcher, { refreshInterval: 1000 });

  return (
    <div className="flex flex-col bg-base-200 rounded-xl w-full md:w-1/3 md:overflow-hidden p-2">
      <div className="overflow-x-auto w-full scrollbar-hide">
        <table className="table w-full table-zebra table-compact">
          <thead>
            <tr>
              <th colSpan={3} className="text-primary text-xl text-center">
                Zaproszenia
              </th>
            </tr>
            <tr>
              <th>Imię</th>
              <th>Email</th>
              <th>Akcje</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={3} className="text-primary text-center">
                Wychodzące
              </td>
            </tr>
            {outgoingInv &&
              outgoingInv.map((friend) => (
                <PendingOutgoingRow key={friend.id} {...friend} />
              ))}
            <tr>
              <td colSpan={3} className="text-primary text-center">
                Przychodzące
              </td>
            </tr>
            {incomingInv &&
              incomingInv.map((friend) => (
                <PendingIncomingRow key={friend.id} {...friend} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFriendsPendingTable;
