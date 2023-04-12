import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import Divider from "../../common/Divider";
import { faHeading } from "@fortawesome/free-solid-svg-icons";
import Button from "../../common/Button";
import {Product} from "../../../interfaces/product/product";

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

export const CreateKittyFirstStep = ({dispatch,state}:Props) => {

    const [data,setData]=useState<{name:string,description:string}>({name:state.data.name,description:state.data.description})

    const handleOnChange=(e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>)=>{
        setData({...data,[e.target.id]:e.target.value})
        dispatch({type:e.target.id ,payload:e.target.value})
    }
  return (
    <div className={"grid w-5/6 overflow-y-auto m-5 place-items-center "}>
      <Divider />

      <input
        type={"text"}
        id={"name"}
        value={data.name}
        placeholder={"Nazwa Zrzutki"}
        className="input  input-bordered placeholder:opacity-70"
        onChange={(e)=>handleOnChange(e)}
      />

      <Divider />
      <textarea
        placeholder="Opis zrzutki "
        id={"description"}
        className="textarea textarea-bordered textarea-lg resize-none h-96 w-full max-w-xl"
        value={data.description}
        onChange={(e)=>handleOnChange(e)}
      ></textarea>
    </div>
  );
};
