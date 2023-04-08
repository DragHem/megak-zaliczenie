import React from "react";

import { GetServerSideProps } from "next";

const KittiesList = React.lazy(
  () => import("../../components/kitties/kittiesList")
);
const KittyDetails = React.lazy(
  () => import("../../components/kitties/kittyDetails")
);

import { UserService } from "../../services";

import { kitty } from "../../interfaces/kitty";

type Props = {
  kitties: kitty[];
};

export default function kitties({ kitties }: Props) {
  return (
    <div className="flex overflow-hidden gap-4 h-full">
      <div className="p-3 flex-grow w-1/4 h-1/1 card gap-3 bg-base-300 rounded-box">
        <KittiesList kitties={kitties} />
      </div>

      <div className="w-3/4 overflow-auto  p-3 left-1/4 bg-base-300 rounded-box overflow-auto scrollbar-hide">
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
