import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { UserService, KittyService } from "services";
import _ from "lodash";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    nickname: string | null;
  };
};

export default function Home({ user }: Props) {
  const { data } = useSession();

  if (!data) {
    return (
      <div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Jesteś zalogowany!</h2>
      <h2>{user.email}</h2>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
      <br />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const user = await UserService.getUser(session.user.email);
    const userResponse = _.omit(
      user,
      "password",
      "isActive",
      "isVirtual",
      "friends"
    );

    return {
      props: {
        user: userResponse,
      },
    };
  }

  return {
    props: {},
  };
};
