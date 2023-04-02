import React, { useState } from "react";
import Input from "components/common/Input";

import {
  faRightToBracket,
  faUser,
  faLock,
  faAt,
} from "@fortawesome/free-solid-svg-icons";

import Button from "components/common/Button";
import Divider from "components/common/Divider";

import { useForm } from "react-hook-form";
import validator from "validator";
import { SignupResponse } from "../../interfaces/signup/signup";
import Toast from "components/common/Toast";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

type FormValues = {
  name: string;
  nickname: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [response, setResponse] = useState<SignupResponse | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = async (formValues: FormValues) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: SignupResponse = await response.json();
    setResponse(data);

    setTimeout(() => setResponse(null), 1500);
  };

  return (
    <>
      <form
        className="form-control grid mt-20 place-items-center"
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <h2 className="text-3xl">Rejestracja</h2>
        <Input
          icon={faRightToBracket}
          placeholder="Marcin"
          label="Imię"
          register={register("name", { required: "To pole jest wymagane" })}
          errorMessage={errors.name?.message}
        />
        <Input
          icon={faUser}
          placeholder="AlaOla"
          label="Nazwa użytkownika"
          register={register("nickname", { required: "To pole jest wymagane" })}
          errorMessage={errors.nickname?.message}
        />
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
        <Button primary>Zarejestruj</Button>
      </form>
      {response && (
        <Toast message={response.message} status={response.status} />
      )}
    </>
  );
};

export default SignUpPage;

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
