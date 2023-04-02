import React, { useState } from "react";

import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import { useForm } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";

import Input from "components/common/Input";
import Divider from "components/common/Divider";
import Button from "components/common/Button";
import { useRouter } from "next/router";
import Toast from "../../components/common/Toast";
import { ErrorResponseStatus } from "../../interfaces/ErrorResponseStatus";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

type FormValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const [response, setResponse] = useState<SignInResponse | null>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (formValues: FormValues) => {
    const response = await signIn("credentials", {
      redirect: false,
      ...formValues,
    });

    console.log(response);

    if (!response?.error) {
      await router.push("/");
    }

    setResponse(response);
    setTimeout(() => setResponse(null), 1500);
  };

  return (
    <>
      <form
        className="form-control grid mt-20 place-items-center"
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <h2 className="text-3xl">Logowanie</h2>

        <Input
          icon={faAt}
          placeholder="example@email.com"
          label="Email"
          register={register("email", {
            required: "To pole jest wymagane",
            validate: (value) =>
              validator.isEmail(value) || "Podaj prawidłowy adres email",
          })}
          errorMessage={errors.email?.message}
        />

        <Input
          icon={faLock}
          placeholder="Twoje hasło..."
          label="Hasło"
          type="password"
          register={register("password", { required: "To pole jest wymagane" })}
          errorMessage={errors.password?.message}
        />
        <Divider />
        <Button primary>Zaloguj się</Button>
      </form>
      {response && (
        <Toast message={response.error} status={ErrorResponseStatus.error} />
      )}
    </>
  );
};

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};
