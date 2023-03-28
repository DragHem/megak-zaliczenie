import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { MailModule } from "../lib/mailModule";

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

  // MailModule.sendMail(
  //   "pusiek99@interia.pl",
  //   "test",
  //   "test",
  //   "Kitty Project - Dodano cię do zrzutki"
  // );

  return {
    props: {},
  };
};
