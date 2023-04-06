import React from "react";
import Link from "next/link";

const RegisterLoginButtons = () => {
  return (
    <>
      <Link href="/auth/signin" className="btn m-1">
        Zaloguj się
      </Link>
      <Link href="/auth/signup" className="btn m-1 btn-primary">
        Zarejestruj się
      </Link>
    </>
  );
};

export default RegisterLoginButtons;
