import React from "react";
import UserFriendsTablePengingRow from "./UserFriendsTablePengingRow";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserFriendsPendingTable = () => {
  const { data, error, isLoading } = useSWR<
    {
      id: string;
      name: string;
      nickname: string;
      email: string;
    }[]
  >("/api/user/invites/outgoing", fetcher);

  return (
    <div className="flex flex-col bg-base-200 rounded-xl w-full md:w-1/3 md:overflow-hidden p-2">
      <h2 className="text-primary text-xl text-center">Zaproszeni znajomi</h2>
      <div className="overflow-x-auto w-full scrollbar-hide">
        <table className="table w-full table-zebra table-compact">
          <thead>
            <tr>
              <th>Imię</th>
              <th>Email</th>
              <th>Akcje</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((friend) => (
                <UserFriendsTablePengingRow key={friend.id} {...friend} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFriendsPendingTable;
