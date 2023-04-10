import {Product} from "../../../interfaces/product/product";
import React, {useState} from "react";
import Button from "../../common/Button";
import Divider from "../../common/Divider";
import {FriendsList} from "../../common/FriendsList";

interface Action{
    type:string,
    payload:string|number|Product|{id:string,name:string,nickname:string}[]
}

interface Props{
    dispatch:React.Dispatch<Action>
    state:State;
}

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


export const CreateKittyThirdStep = ({dispatch,state}:Props) => {
    const [showFriendsList,setShowFriendsList]=useState<boolean>(false)
    const [product,setProduct]=useState<Product>({name:"",price:0,userIDs:[]})

    const handleSubmit=()=>{
        console.log("ss")
        dispatch({type:"productAdd",payload:product})
        setProduct({name:"",price:0,userIDs:[]})
    }
    console.log(state.data.product)
    return(
    <div className={"grid m-5 p-4 place-items-center gap-x-5"}>
        <Divider />
        <div className={"flex"}>
            <Button onClick={()=>setShowFriendsList(prevState => !prevState)} primary>Pokaż uczestników zrzutki</Button>
            {showFriendsList&&<FriendsList state={state} setProduct={setProduct} product={product}/>}
        <input
            type={"text"}
            placeholder={"Nazwa produktu"}
            className="input mt-1 ml-4 input-bordered placeholder:opacity-70"
            onChange={(e)=>setProduct({...product,name:e.target.value})}
        />
        <input
            type={"number"}
            placeholder={"Cena"}
            className="input mt-1 ml-5 mb-5 input-bordered placeholder:opacity-70"
            onChange={(e)=>setProduct({...product,price:Number(e.target.value)})}
        />
        </div>
    <Button primary onClick={()=>handleSubmit()}>Dodaj produkt</Button>
    </div>)
}