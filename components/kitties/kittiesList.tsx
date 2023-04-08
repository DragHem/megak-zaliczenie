import { KittyCard } from "./KittyCard";
import { Dispatch, SetStateAction } from "react";
import { kittyList } from "../../interfaces/kitty";

interface Props {
  id: string;
  kitties: kittyList[];
  setKitty: Dispatch<SetStateAction<kittyList>>;
}

export const KittiesList = ({ id, kitties, setKitty }: Props) => {
  const kittiesList = kitties.map((kitty) => (
    <KittyCard setKitty={setKitty} active={id !== kitty.id} kitty={kitty} />
  ));
  return <div>{kittiesList}</div>;
};
