import { useEffect, useState } from "react";
import { Chart } from "./chart";
import { kitty } from "../../interfaces/kitty";
import { UserService } from "../../services";

interface Props {
  kitty: kitty;
}

export const KittyDetails = ({ kitty }: Props) => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [kittyData, setKitty] = useState<kitty>();

  useEffect(() => {
    console.log(kitty);
    (async () => {
      const resp = await fetch("http://localhost:3000/api/user/getUsers", {
        method: "POST",
        body: JSON.stringify({ users: kitty.users }),
      });
      const users = await resp.json();
      const dataInit = [];
      for (let i = 0; i < kitty.users.length; i++) {
        dataInit.push({
          name: users[i].nickname ? users[i].nickname : users[i].name,
          value: kitty.userValues[i],
        });
      }
      setData(dataInit);
    })();
  }, [kitty]);

  return (
    <div className={"p-3"}>
      <Chart data={data} />
      <p>jakieś dane się pomyśli</p>
    </div>
  );
};
