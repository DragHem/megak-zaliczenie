import React from "react";
import UserFriendsTableRow from "./UserFriendsTableRow";

const UserFriendsTable = () => {
  return (
    <div className="flex flex-col bg-base-300 rounded-xl w-full md:w-1/3 md:overflow-hidden p-2">
      <h2 className="text-primary text-xl text-center">Znajomi</h2>
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
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
            <UserFriendsTableRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFriendsTable;
