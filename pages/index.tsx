import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import client from "../lib/prismadb";

export default function Home() {
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
      <img src={data.user.image} alt="" />
      <br />
      <button onClick={() => signOut()}>Sign out</button>
      <br />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const user = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        kitty: true,
      },
    });

    console.log(user);
  }

  return {
    props: {},
  };
};
