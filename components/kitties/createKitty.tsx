import React, {useEffect, useReducer, useState} from "react";


import Button from "components/common/Button";

import { CreateKittyFirstStep } from "./createKittySteps/createKittyFirstStep";
import { CreateKittySecondStep } from "./createKittySteps/createKittySecondStep";
import {Product} from "../../interfaces/product/product";
import {CreateKittyThirdStep} from "./createKittySteps/createKittyThirdStep";
import {CreateKittyFourthStep} from "./createKittySteps/createKittyFourthStep";

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


function setData(state:State,action:Action):State{
    const {type,payload}=action;
    console.log(payload)
    switch(type) {
        case "name":
            state.data.name=payload as string
            break;
        case "description":
            state.data.description=payload as string
            break;
        case "user":
            const copy=payload as {id:string,name:string,nickname:string}[];
            state.data.users=copy;
            break;
        case "product":
            const productCopy=payload as Product[];
            state.data.product=productCopy;
            break;
        case "totalValue":
            state.data.totalValue=payload as number
            break;
    }
    console.log(state)
    return state;
}

export const CreateKitty = () => {
  const [step, setStep] = useState<number>(1);
  const [state, dispatch] = useReducer(setData,{data:  {userId: "",
        name: "",
        description: "",
        totalValue: 0,
        product:[],
        users: []}})
    console.log(state)


  return (
    <div className="grid place-items-center mt-10">
      <ul className="steps">
        <li
          onClick={() => setStep(1)}
          className={`step ${step > 0 ? "step-warning" : ""}`}
        >
          Wybierz nazwę i opis
        </li>
        <li
          onClick={() => setStep(2)}
          className={`step ${step > 1 ? "step-warning" : ""}`}
        >
          Dodaj znajomych
        </li>
        <li
          onClick={() => setStep(3)}
          className={`step ${step > 2 ? "step-warning" : ""}`}
        >
          Dodaj Produkty
        </li>
        <li
          onClick={() => setStep(4)}
          className={`step ${step > 3 ? "step-warning" : ""}`}
        >
          Zobacz podsumowanie
        </li>
      </ul>
        {step == 1 && <CreateKittyFirstStep state={state} dispatch={dispatch} />}
        {step == 2 && <CreateKittySecondStep state={state} dispatch={dispatch}/>}
        {step == 3 && <CreateKittyThirdStep state={state} dispatch={dispatch}/>}
        {step == 4 && <CreateKittyFourthStep state={state} dispatch={dispatch}/>}
      <div className={"flex"}>
        {step > 1 && (
          <Button primary onClick={() => setStep((prevState) => prevState - 1)}>
            Wstecz
          </Button>
        )}
        {step < 4 && (
          <Button primary onClick={() => setStep((prevState) => prevState + 1)}>
            Dalej
          </Button>
        )}
      </div>
    </div>
  );
};
