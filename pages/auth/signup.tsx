import React, { useEffect } from "react";
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
import usePost from "hooks/usePost";

import validator from "validator";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { usePopup } from "../../components/providers/PopupProvider";
import { Signup } from "../../interfaces/signup/signup";

const SignUpPage = () => {
  const [resp, call] = usePost("/api/auth/signup");

  const { triggerPopup } = usePopup();

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

  const formHandler = async (formValues: Signup) => {
    await call(formValues);
  };

  useEffect(() => {
    triggerPopup(resp.message, resp.status);
  }, [resp.message, resp.status]);

  return (
    <form
      className="form-control grid place-items-center"
      onSubmit={handleSubmit((formValues) => formHandler(formValues))}
    >
      <h2 className="text-3xl my-3 md:my-16">Rejestracja</h2>
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
      <Button primary disabled={resp.isLoading}>
        Zarejestruj
      </Button>
    </form>
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
