import { KittyCard } from "./KittyCard";
import { kittyList } from "../../interfaces/kitty";
import { CreateKittyCard } from "./createKittyCard";
import Divider from "../common/Divider";

interface Props {
  kitties: kittyList[];
    setKittySwitch: React.Dispatch<React.SetStateAction<boolean>>;
    kittySwitch:boolean;
}

const KittiesList = ({ kitties,kittySwitch,setKittySwitch }: Props) => {
  return (
    <>
      <CreateKittyCard />
        <p className={"text-lg text-center"}>{kittySwitch? "Nie aktywne":"Aktywne"} zrzutki <input type="checkbox" className="toggle rotate-1 toggle-warning" onChange={()=>setKittySwitch(prevState => !prevState)} checked={!kittySwitch}/></p>
      {kitties &&
        kitties.map((kitty) => <KittyCard isEnded={kittySwitch} kitty={kitty} key={kitty.id} />)}
    </>
  );
};

export default KittiesList;
