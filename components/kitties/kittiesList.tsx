import { KittyCard } from "./KittyCard";
import { kittyList } from "../../interfaces/kitty";
import { CreateKittyCard } from "./createKittyCard";

interface Props {
  kitties: kittyList[];
}

const KittiesList = ({ kitties }: Props) => {
  return (
    <>
      <CreateKittyCard />
      {kitties.map((kitty) => (
        <KittyCard kitty={kitty} key={kitty.id} />
      ))}
    </>
  );
};

export default KittiesList;
