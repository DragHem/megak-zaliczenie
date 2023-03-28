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
      <h2>Jesteś zalogowany!</h2>
      {/*<img src={data.user.image} alt="" />*/}
      <br />
      <button onClick={() => signOut()}>Sign out</button>
      <br />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const resp = await KittyService.getKittys("641edd7c87cac162fa64d757");
  console.log(resp);
  const resp2 = await KittyService.getKittys("641b331fce7e74f75835c4b8");
  console.log(resp2);
  return {
    props: {},
  };
};
