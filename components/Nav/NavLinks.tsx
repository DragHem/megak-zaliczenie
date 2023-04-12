import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from "../common/Button";

const NavLinks = () => {
  const { data } = useSession();

  if (!data) {
    return (
      <>
        <li>
          <Link href="/auth/signin" className="btn mb-2 md:mb-0">
            Zaloguj się
          </Link>
        </li>
        <li>
          <Link href="/auth/signup" className="btn btn-primary">
            Zarejestruj się
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/kitty/" className="btn mb-2 md:mb-0 md:ml-2">
          Twoje zrzutki
        </Link>
      </li>
      <li>
        <Button primary onClick={signOut}>
          Wyloguj
        </Button>
      </li>
    </>
  );
};

export default NavLinks;
