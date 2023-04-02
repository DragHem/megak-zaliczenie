import React from "react";
import Button from "./common/Button";
import Link from "next/link";

const RegisterLoginButtons = () => {
  return (
    <>
      <Link href="/auth/signin">
        <Button>Zaloguj się</Button>
      </Link>
      <Link href="/auth/signup">
        <Button primary>Zarejestruj się</Button>
      </Link>
    </>
  );
};

export default RegisterLoginButtons;
