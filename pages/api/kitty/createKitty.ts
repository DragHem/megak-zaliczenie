import { NextApiRequest, NextApiResponse } from "next";
import {Product} from "../../../interfaces/product/product";
import {KittyService} from "../../../services";


const createKitty = async (req: NextApiRequest, res: NextApiResponse) => {
    const {userId,name,description,totalValue,product,users}
        :{userId:string,name:string,description:string,totalValue:number,product:Product[],users:{id:string,name:string,nickname:string}[]}=req.body
    console.log(users.map(x=>x.id))

    // const resp=await KittyService.createKitty(
    //     userId,
    //     name,
    //     description,
    //     totalValue,
    //     product,
    //     users.map(x=>x.id)
    // )
    res.json(req.body);
};

export default createKitty;