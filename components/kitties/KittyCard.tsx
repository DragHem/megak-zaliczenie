import { Dispatch, SetStateAction, useState } from "react";
import { kittyList } from "../../interfaces/kitty";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  // active: boolean;
  kitty: kittyList;
  // setKitty: Dispatch<SetStateAction<kittyList>>;
}

export const KittyCard = ({ kitty }: Props) => {
  const { query } = useRouter();

  return (
    <Link href={kitty.id} scroll={false}>
      <div
        // onClick={() => setKitty({ ...kitty })}
        //${
        //           active ? "bg-warning" : "bg-yellow-600"
        //         }
        className={`card mb-3 mt-3 w-full text-primary-content ${
          query.id === undefined
            ? "bg-yellow-600"
            : query.id[0] === kitty.id
            ? "bg-warning"
            : "bg-yellow-600"
        }`}
      >
        <div className="card-body">
          <h2 className="card-title">{kitty.name}</h2>
          <p>{kitty.description}</p>
        </div>
      </div>
    </Link>
  );
};
