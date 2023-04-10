import { KittyCard } from "./KittyCard";
import { kittyList } from "../../interfaces/kitty";
import { CreateKittyCard } from "./createKittyCard";

interface Props {
  kitties: kittyList[];
}

export const KittiesList = ({ kitties }: Props) => {
  return (
    <div>
      <CreateKittyCard />
      {kitties.map((kitty) => (
        <KittyCard key={kitty.id} kitty={kitty} />
      ))}
    </div>
  );
};
