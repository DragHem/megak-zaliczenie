import React, { useEffect } from "react";
import Input from "../common/Input";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";
import Divider from "../common/Divider";
import { useForm } from "react-hook-form";
import validator from "validator";
import usePost, { InviteFriend } from "../../hooks/usePost";
import { usePopup } from "../providers/PopupProvider";

interface Props {
  user: UserResponse;
}

type UserResponse = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  nickname: string;
};

const UserCard = ({ user }: Props) => {
  const { nickname, name, image, email } = user;

  const [resp, call] = usePost("/api/user/friends");

  const { triggerPopup } = usePopup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const formHandler = async (formValues: InviteFriend) => {
    await call(formValues);
  };

  useEffect(() => {
    triggerPopup(resp.message, resp.status);
  }, [resp]);

  const avatar = image || "/avatar-placeholder.webp";

  return (
    <div className="card card-compact bg-base-200 shadow-xl w-full md:w-1/3">
      <figure className="px-10 pt-10">
        <img
          src={avatar}
          alt={`Zdjęcie użytkownika - ${nickname}`}
          className="mask mask-circle"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <h2 className="text-secondary italic">{nickname}</h2>
        <p>{email}</p>
        <Divider />
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit((formValues) => formHandler(formValues))}
        >
          <h3>Zaproś znajomych</h3>
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
          <Divider />
          <Button primary>Zaproś</Button>
        </form>
      </div>
    </div>
  );
};

export default UserCard;
