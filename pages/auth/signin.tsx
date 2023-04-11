import React from "react";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";

import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import isEmail from "validator/lib/isEmail";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { usePopup } from "components/providers/PopupProvider";
import { authOptions } from "../api/auth/[...nextauth]";
import Input from "../../components/common/Input";
import Divider from "../../components/common/Divider";
import Button from "../../components/common/Button";

type FormValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const router = useRouter();

  const { triggerPopup } = usePopup();

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

    if (response) {
      triggerPopup(response.error, "error");
    }

    if (!response?.error) {
      await router.push("/");
    }
  };

  return (
    <form
      className="form-control grid place-items-center"
      onSubmit={handleSubmit((data) => submitHandler(data))}
    >
      <h2 className="text-3xl my-3 md:my-16">Logowanie</h2>

      <Input
        icon={faAt}
        placeholder="example@email.com"
        label="Email"
        register={register("email", {
          required: "To pole jest wymagane",
          validate: (value) => isEmail(value) || "Podaj prawidłowy adres email",
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
