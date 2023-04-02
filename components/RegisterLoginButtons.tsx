import React from "react";
import Button from "./common/Button";
import Link from "next/link";

const RegisterLoginButtons = () => {
  return (
    <>
      <Button>
        <Link href="/auth/signin">Zaloguj się</Link>
      </Button>
      <Button primary>
        <Link href="/auth/signup">Zarejestruj się</Link>
      </Button>
    </>
  );
};

export default RegisterLoginButtons;
