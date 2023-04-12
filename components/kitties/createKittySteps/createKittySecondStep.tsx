import React, {useEffect, useReducer, useState} from "react";
import Button from "../../common/Button";
import {Product} from "../../../interfaces/product/product";
import Divider from "../../common/Divider";
import {UserService} from "../../../services";
import {useSession} from "next-auth/react";

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
    payload:string|number|Product[]|{id:string,name:string,nickname:string}[]
}

interface Props{
  dispatch:React.Dispatch<Action>,
    state:State
}




export const CreateKittySecondStep = ({dispatch,state}:Props) => {
    const {data}=useSession()
    const [friends,setFriends]=useState<{id:string,nickname:string,name:string}[]>(
        [
            { id: "1", nickname: "jakub1", name: "jakub1" },
            { id: "2", nickname: "jakub2", name: "jakub2" },
            { id: "3", nickname: "jakub3", name: "jakub3" },
            { id: "4", nickname: "jakub4", name: "jakub4" },
        ]
    )
  const [users,setUsers]=useState<{id:string,nickname:string,name:string}[]>(state.data.users)
    const [user,setUser]=useState<{id:string,nickname:string,name:string}>()

    useEffect(()=>{
        (async()=>{
            console.log(data?.user.email)
            const friends=await fetch('/api/kitty/getFriends',{
                method:'POST',
                body: JSON.stringify({email:data?.user.email}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const copyFriends=await friends.json()
            copyFriends.push({id:data?.user.id,name:data?.user.name,nickname:""})
        setFriends(copyFriends)})();
    },[])

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

          setUsers(unique);
          dispatch({type: "user", payload: unique})
      }
}

const handleDelete=(id:string)=>{
    const copy=users.filter(x=>x.id!==id);
    setUsers(copy)
    dispatch({type: "user", payload: copy})
}



  return (
      <div className={"grid m-5 overflow-y-auto place-items-center"}>
          <Divider />

            <Button primary onClick={handleSubmit}>Dodaj znajomego</Button>
          <select onChange={(e)=>handleOnChange(e)} className="select select-bordered select-lg w-full max-w-xs">
            <option  selected disabled>
              Wybierz Przyjaciela z listy
            </option>
            {friends.map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </select>



          <div className={"content-center h-64 overflow-y-scroll scrollbar-hide"}>
          {users.map(x=><p >{x.name} <Button primary onClick={()=>handleDelete(x.id)}>Usuń</Button></p>)}
          </div>
      </div>
  );
};
