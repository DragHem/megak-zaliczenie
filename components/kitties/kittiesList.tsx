import { KittyCard } from "./KittyCard";
import { kittyList } from "../../interfaces/kitty";

interface Props {
  kitties: kittyList[];
}

const KittiesList = ({ kitties }: Props) => {
  return (
    <>
      {kitties.map((kitty) => (
        <KittyCard kitty={kitty} />
      ))}
    </>
  );
};

export default KittiesList;
