import { signIn, signOut, useSession } from "next-auth/react";

import { KittiesList } from "../../components/kitties/kittiesList";
import { useState } from "react";
import { KittyDetails } from "../../components/kitties/kittyDetails";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { KittyService, UserService } from "../../services";
import _ from "lodash";
import { DateTime } from "next-auth/providers/kakao";
import { kitty, kittyList } from "../../interfaces/kitty";

type Props = {
  kitties: kitty[];
};

export default function kitties({ kitties }: Props) {
  const { data } = useSession();
  // const [kittyDetails, setKitty] = useState<kittyList>({
  //   id: "",
  //   name: "",
  //   createdAt: "",
  //   description: "",
  //   totalValue: 0,
  // });

  return (
    <div>
      <div className="p-3 flex-grow w-1/4 card bg-base-300 rounded-box">
        <KittiesList
          // setKitty={setKitty}
          kitties={kitties}
          // id={kittyDetails.id}
        />
      </div>
      <div className="fixed ml-3 w-3/4 top-0 h-screen left-1/4 bg-base-300 rounded-box">
        {/*<KittyDetails kitty={kittyDetails} />*/}
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
    /* const kitties = RespKitties.kitties.map((x) => {
      return {
        ...x,
        createdAt: x.createdAt.toISOString(),
        userValues: x.users.map((user) =>
          x.products.reduce(
            (acc, curr) =>
              curr.users.find((ProductUser) => ProductUser.id == user)
                ? Math.ceil((curr.price / curr.users.length) * 100) / 100 + acc
                : acc + 0,
            0
          )
        ),
      };
    });
*/

    return {
      props: { kitties },
    };
  }
  return {
    props: {},
  };
};
