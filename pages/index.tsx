import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import client from "../lib/prismadb";
import { UserService } from "../services/userService";
import { KittyService } from "../services/kittyService";

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

  const resp = await UserService.getUserKittysActive(
    "641edd7c87cac162fa64d757"
  );
  // @ts-ignore
  //console.log(resp2);
  console.log(resp2);
  // @ts-ignore
  // console.log(resp.kittys[16]);
  return {
    props: {},
  };
};
