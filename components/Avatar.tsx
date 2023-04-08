import React from "react";

import Link from "next/link";

interface Props {
  avatarLink?: string | null;
}

const Avatar = ({ avatarLink }: Props) => {
  const avatar = avatarLink || "/avatar-placeholder.webp";

  return (
    <Link href="/user">
      <div className="avatar btn btn-ghost btn-circle">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={avatar} alt="User avatar" />
        </div>
      </div>
    </Link>
  );
};

export default Avatar;
