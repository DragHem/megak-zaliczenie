import React from "react";

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

  const avatar = image || "/avatar-placeholder.webp";

  return (
    <div className="card card-compact bg-base-300 shadow-xl w-full md:w-1/3">
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
      </div>
    </div>
  );
};

export default UserCard;
