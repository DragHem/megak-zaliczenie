import { KittyCard } from "./KittyCard";
import { kittyList } from "../../interfaces/kitty";

interface Props {
  kitties: kittyList[];
}

export const KittiesList = ({ kitties }: Props) => {
  const kittiesList = kitties.map((kitty) => <KittyCard kitty={kitty} />);
  return <div>{kittiesList}</div>;
};
