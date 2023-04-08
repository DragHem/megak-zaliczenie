import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from "../common/Button";

const NavLinks = () => {
  const { data } = useSession();

  if (data)
    return (
      <>
        <Link href="/kitty" className="btn mb-2 sm:mb-0">
          Twoje zrzutki
        </Link>
        <Button primary onClick={signOut}>
          Wyloguj
        </Button>
      </>
    );

  return (
    <>
      <Link href="/auth/signin" className="btn mb-2 sm:mb-0">
        Zaloguj się
      </Link>
      <Link href="/auth/signup" className="btn btn-primary">
        Zarejestruj się
      </Link>
    </>
  );
};

export default NavLinks;
