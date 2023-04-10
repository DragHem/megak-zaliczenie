import React, { useReducer, useState } from "react";
import Button from "../../common/Button";
import {Product} from "../../../interfaces/product/product";
import Divider from "../../common/Divider";

interface State{
    data: {
        userId: string;
        name: string,
        description: string,
        totalValue: number,
        product: Product[],
        users: {id:string,name:string,nickname:string}[]
    }
}
interface Action{
    type:string,
    payload:string|number|Product|{id:string,name:string,nickname:string}[]
}

interface Props{
  dispatch:React.Dispatch<Action>,
    state:State
}




export const CreateKittySecondStep = ({dispatch,state}:Props) => {
  const friends = [
    { id: "1", nickname: "jakub1", name: "jakub1" },
    { id: "2", nickname: "jakub2", name: "jakub2" },
    { id: "3", nickname: "jakub3", name: "jakub3" },
    { id: "4", nickname: "jakub4", name: "jakub4" },
  ];

  const [users,setUsers]=useState<{id:string,nickname:string,name:string}[]>(state.data.users)
    const [user,setUser]=useState<{id:string,nickname:string,name:string}>()
const handleOnChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{

      const user=friends.find(user=>user.id==e.target.value)
      setUser(user);
}

const handleSubmit=()=>{
      if(user) {
          const copy=users;
          copy.push(user);
          // @ts-ignore
          const unique = [...new Map(copy.map(item =>
              [item["id"], item])).values()];
          console.log(unique)
          setUsers(unique);
          dispatch({type: "user", payload: unique})
      }
}

const handleDelete=(id:string)=>{
    const copy=users.filter(x=>x.id!==id);
    setUsers(copy)
    dispatch({type: "user", payload: copy})
}

console.log(users)

  return (
      <div className={"grid m-5 place-items-center"}>
          <Divider />
        <div className={"flex mt-5 mb-5 w-96"}>
          <select onChange={(e)=>handleOnChange(e)} className="select select-bordered select-lg w-full max-w-xs">
            <option  selected disabled>
              Wybierz Przyjaciela z listy
            </option>
            {friends.map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </select>
            <Button primary onClick={handleSubmit}>Dodaj znajomego</Button>

        </div>
          <div className={"content-center"}>
          {users.map(x=><p >{x.name} <Button primary onClick={()=>handleDelete(x.id)}>Usuń</Button></p>)}
          </div>
      </div>
  );
};
