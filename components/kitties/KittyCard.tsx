import { Dispatch, SetStateAction, useState } from "react";
import { kittyList } from "../../interfaces/kitty";

interface Props {
  active: boolean;
  kitty: kittyList;
  setKitty: Dispatch<SetStateAction<kittyList>>;
}

export const KittyCard = ({ kitty, active, setKitty }: Props) => {
  return (
    <div>
      <div
        onClick={() => setKitty({ ...kitty })}
        className={`card mb-3 mt-3 w-full ${
          active ? "bg-warning" : "bg-yellow-600"
        } text-primary-content`}
      >
        <div className="card-body">
          <h2 className="card-title">{kitty.name}</h2>
          <p>{kitty.description}</p>
        </div>
      </div>
    </div>
  );
};
