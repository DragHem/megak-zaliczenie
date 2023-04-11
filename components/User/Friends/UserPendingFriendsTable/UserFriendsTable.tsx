import React from "react";
import UserFriendsTableRow from "./UserFriendsTableRow";

const UserFriendsTable = () => {
  return (
    <div className="overflow-auto scrollbar-hide">
      <table className="table table-compact">
        <caption className="text-primary my-4 text-xl">Znajomi</caption>
        {/* head */}
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
        </tbody>
      </table>
    </div>
  );
};

export default UserFriendsTable;
