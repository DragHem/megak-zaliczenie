import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Divider from "../../common/Divider";
import { faHeading } from "@fortawesome/free-solid-svg-icons";
import Button from "../../common/Button";
import {Product} from "../../../interfaces/product/product";

interface Action{
    type:string,
    payload:string|number|Product|{id:string,name:string,nickname:string}[]
}

interface Props{
    dispatch:React.Dispatch<Action>
}

export const CreateKittyFirstStep = ({dispatch}:Props) => {
  return (
    <div className={"grid w-5/6 m-5 place-items-center "}>
      <Divider />

      <input
        type={"text"}
        placeholder={"Nazwa Zrzutki"}
        className="input  input-bordered placeholder:opacity-70"
        onChange={(e)=>dispatch({type:"name",payload:e.target.value})}
      />

      <Divider />
      <textarea
        placeholder="Opis zrzutki "
        className="textarea textarea-bordered textarea-lg resize-none h-96 w-full max-w-xl"
        onChange={(e)=>dispatch({type:"description",payload:e.target.value})}
      ></textarea>
    </div>
  );
};
