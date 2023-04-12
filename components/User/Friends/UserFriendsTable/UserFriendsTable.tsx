import React from "react";
import UserFriendsTableRow from "./UserFriendsTableRow";

interface Props {
  friends: Friend[];
}

type Friend = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  nickname: string;
};

const UserFriendsTable = ({ friends }: Props) => {
  return (
    <div className="flex flex-col bg-base-200 rounded-xl w-full md:w-1/3 md:overflow-hidden p-2">
      <div className="overflow-x-auto w-full scrollbar-hide">
        <table className="table w-full table-zebra table-compact">
          <thead>
            <tr>
              <th colSpan={3} className="text-primary text-xl text-center">
                Zaproszeni znajomi
              </th>
            </tr>
            <tr>
              <th>Imię</th>
              <th>Email</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {friends &&
              friends.map((friend) => (
                <UserFriendsTableRow {...friend} key={friend.id} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFriendsTable;
