import useSWR from "swr";
import { useRouter } from "next/router";
import { Chart } from "./chart";
import { CreateKitty } from "./createKitty";
import React from "react";
import {Product} from "../../interfaces/product/product";
import Divider from "../common/Divider";
import Button from "../common/Button";
import {useSession} from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const KittyDetails = () => {
  const { query } = useRouter();
  const session=useSession()
  const { data, error, isLoading } = useSWR(
    query.id &&
      (query.id[0] === "createKitty" ? null : `/api/kitty/${query.id[0]}`),
    fetcher
  );

  if (query.id) {
    if (query.id == "createKitty") {
      return <CreateKitty />;
    }

    if (isLoading) {
      return <div>loading</div>;
    }

    if (!data) return null;
    const {products,isEnded}:{isEnded:boolean,products:{name:string,price:number,users:{name:string,nickname:string,id:string}[]}[]}=data;
  const users:{value:number,name:string}[]=data.data


  const handleSubmit=async(id:string)=>{
      await fetch('/api/kitty/kittyEnd',{
      method:'POST',
      body: JSON.stringify({id,isEnded}),
      headers: {
        "Content-Type": "application/json",
      },
    });

  }
    return (
        <div>
          {((data.owner.id==session.data?.user.id)&&!isEnded)&&<Button primary onClick={()=>handleSubmit(query.id?query.id[0]:"")}>Zakończ zrzutkę</Button>}
        <Chart data={data.data} />
      <div className={"grid place-items-center"}>
        <table className="table w-full">
          <thead>
          <tr>
            <th>Imię</th>
            <th>Należność</th>

          </tr>
          </thead>
          <tbody>
          {users.map(user=>
            <tr className={"hover"}>
              <td>{user.name}</td>
              <td>{user.value}</td>
            </tr>
          )}
          </tbody>
        </table>
        <Divider/>
        <table className="table w-full">
          <thead>
          <tr>
            <th>Nazwa Produktu</th>
            <th>Cena Całkowita</th>
            <th>Osoby Składające się</th>
            <th>Cena na osobę</th>
          </tr>
          </thead>
          <tbody>
          {products.map(product=><tr className={"hover"}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.users.map(user=><p>- {user.name}</p>)}</td>
            <td>{Math.floor((product.price/product.users.length)*100)/100}</td>
          </tr>)}
          </tbody>
        </table>
      </div>
        </div>
    );
  }

  return <h2>Wybierz zrzutkę do przeglądania</h2>;
};

export default KittyDetails;
