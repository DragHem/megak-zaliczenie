import {Product} from "../../../interfaces/product/product";
import React, {useEffect, useState} from "react";
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
    payload:string|number|Product[]|{id:string,name:string,nickname:string}[]
}

interface Props{
    dispatch:React.Dispatch<Action>,
    state:State
}

export const CreateKittyFourthStep=({state,dispatch}:Props)=>{

    const [total,setTotal]=useState<number>(0)

    useEffect(()=>{
        const totalValue=state.data.product.reduce((acc,curr)=>curr.price+acc,0);
        setTotal(totalValue)
        dispatch({type:"totalValue",payload:Math.floor(totalValue*100)/100});
    },[])

    return(
        <div className={"overflow-y-auto grid place-items-center p-10 scrollbar-hide"}>
            <h1 className={"text-xl"}><b>Nazwa zrzutki</b> : {state.data.name}</h1>
            <Divider/>
            <h2 className={"text-l"}><b>Kosz całkowity</b> : {state.data.totalValue} zł</h2>
            <Divider/>
            <p className={"m-5 text-justify "}><b>Opis Zrzutki</b> : {state.data.description}</p>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                    <tr>
                        <th>Nazwa produktu</th>
                        <th>Cena</th>
                        <th>Osoby składające się</th>
                        <th>Cena na osobę</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.data.product.map(x=><tr className={"hover"}><td >{x.name}</td><td>{x.price}</td><td>{x.userIDs.map(user=><p>{state.data.users.find(users=>users.id==user)?.name}</p>)}</td><td>{x.price/x.userIDs.length}</td></tr>)}
                    </tbody>
                </table>
            </div>
            Suma na osobę
            {state.data.users.map(x=><div>{x.name} : {Math.floor(state.data.product.reduce((acc,curr)=>curr.userIDs.includes(x.id)?acc+curr.price/curr.userIDs.length:acc,0)*100)/100}</div>)}
        </div>
    )
}