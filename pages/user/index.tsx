import React from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import UserCard from "../../components/User/UserCard";
import { UserService } from "../../services";
import omit from "lodash/omit";
import UserFriends from "../../components/User/UserFriends";

interface Props {
  user: UserResponse;
}

type UserResponse = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  nickname: string;
};

const UserPage = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <UserCard user={user} />
      <UserFriends />
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  const { user: sessionUser } = session;

  const user = await UserService.getUser(sessionUser.email);
  let userFriends;

  if (user) {
    userFriends = await UserService.getUserFriends(user.friends);
  }

  const userDTO = omit(
    user,
    "password",
    "isActive",
    "isVirtual",
    "friends"
  ) as UserResponse;

  return {
    props: {
      user: userDTO,
      userFriends,
    },
  };
};
