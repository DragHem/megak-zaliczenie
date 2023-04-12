import { NextApiRequest, NextApiResponse } from "next";
import {Product} from "../../../interfaces/product/product";
import {KittyService} from "../../../services";


const kittyEnd = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id,isEnded}:{id:string,isEnded:boolean}=req.body

    console.log(id,isEnded)
    await KittyService.changeStatus(id,isEnded)
};

export default kittyEnd;