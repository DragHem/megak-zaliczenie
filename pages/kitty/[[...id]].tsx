import { signIn, signOut, useSession } from "next-auth/react";

import { KittiesList } from "../../components/kitties/kittiesList";

import { KittyDetails } from "../../components/kitties/kittyDetails";
import { GetServerSideProps } from "next";

import { UserService } from "../../services";

import { kitty } from "../../interfaces/kitty";

type Props = {
  kitties: kitty[];
};

export default function kitties({ kitties }: Props) {
  return (
    <div className={"flex overflow-hidden h-7/8"}>
      <div className="p-3 flex-grow w-1/4 h-1/1 card bg-base-300 rounded-box">
        <KittiesList kitties={kitties} />
      </div>

      <div className="ml-3 w-3/4 overflow-auto  p-3 left-1/4 bg-base-300 rounded-box">
        <KittyDetails />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const RespKitties = await UserService.getUserKitties(
    "641edd7c87cac162fa64d757",
    false
  );

  if (RespKitties) {
    const kitties = RespKitties.kitties.map((x) => {
      return {
        ...x,
        createdAt: x.createdAt.toISOString(),
      };
    });
    return {
      props: { kitties },
    };
  }
  return {
    props: {},
  };
};
