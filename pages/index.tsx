import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { UserService } from "services";
import _ from "lodash";
import { KittyCard } from "../components/kitties/KittyCard";

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
        <button className="btn">Hello daisyUI</button>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-green-200">
        Hello world!
      </h1>{" "}
      <h2 className="text-2xl">Jesteś zalogowany!</h2>
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
