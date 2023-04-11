import {Product} from "../../../interfaces/product/product";
import React, {useEffect, useState} from "react";
import Button from "../../common/Button";
import Divider from "../../common/Divider";
import {FriendsList} from "../../common/FriendsList";
import {v4 as uuid} from 'uuid'


interface Action{
    type:string,
    payload:string|number|Product[]|{id:string,name:string,nickname:string}[]
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
    const [product,setProduct]=useState<{name:string,price:number,userIDs:string[],id?:string}>({id:uuid(),name:"",price:0,userIDs:[]})
    const [products,setProducts]=useState<{name:string,price:number,userIDs:string[],id?:string}[]>([])

    useEffect(()=>{
        const array:{name:string,price:number,userIDs:string[],id?:string}[]=[]
        state.data.product.forEach(x=>array.push({name:x.name,price:x.price,userIDs:x.userIDs,id:uuid()}))
        setProducts(array)
    },[])

    const handleAddProduct=()=>{

        if(product.name!=""&&product.price>0&&product.userIDs.length!==0) {


            const id=uuid();
            console.log(id)
            const copyProducts = products;
            copyProducts.push(product)
            setProduct({id:"",name: "", price: 0, userIDs: []})
            setProducts(copyProducts);

            dispatch({type:"product",payload:products.map(x=>{delete x.id;return x})})
        }
    }

    const handleDelete=(id:string)=>{
        const copyProducts=products.filter(x=>x.id!==id)
        setProducts(copyProducts);
        dispatch({type:"product",payload:copyProducts.map(x=>{delete x.id;return x})})
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
            value={product.name}
            className="input mt-1 ml-4 input-bordered placeholder:opacity-70"
            onChange={(e)=>setProduct({...product,name:e.target.value})}
        />
        <input
            type={"number"}
            placeholder={"Cena"}
            value={product.price}
            className="input mt-1 ml-5 mb-5 input-bordered placeholder:opacity-70"
            onChange={(e)=>setProduct({...product,price:Number(e.target.value)})}
        />
        </div>
    <Button primary onClick={()=>handleAddProduct()}>Dodaj produkt</Button>
        {products.map(x=><p>{x.name} : {x.price} <Button primary onClick={()=>handleDelete(x.id)}>Usuń</Button></p>)}
    </div>)
}