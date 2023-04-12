import { NextApiRequest, NextApiResponse } from "next";
import {Product} from "../../../interfaces/product/product";
import {KittyService, UserService} from "../../../services";


const kittyEnd = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id,isEnded}=req.body
    const RespKitties = await UserService.getUserKitties(id, isEnded);
    if(RespKitties)
    {
        const {kitties}=RespKitties
        res.json(kitties);
    }
    else {
        res.json(RespKitties);
    }
};

export default kittyEnd;