import { signIn, signOut, useSession } from "next-auth/react";

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
    </div>
  );
}
