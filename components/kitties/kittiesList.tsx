import { KittyCard } from "./KittyCard";
import { Dispatch, SetStateAction } from "react";
import { kittyList } from "../../interfaces/kitty";

interface Props {
  // id: string;
  kitties: kittyList[];
  // setKitty: Dispatch<SetStateAction<kittyList>>;
}

export const KittiesList = ({ kitties }: Props) => {
  const kittiesList = kitties.map((kitty) => <KittyCard kitty={kitty} />);
  return <div>{kittiesList}</div>;
};
