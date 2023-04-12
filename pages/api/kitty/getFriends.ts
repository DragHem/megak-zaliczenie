import { NextApiRequest, NextApiResponse } from "next";
import {Product} from "../../../interfaces/product/product";
import {KittyService, UserService} from "../../../services";


const createKitty = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email}=req.body;
    const resp=await UserService.getUser(email);

    if(resp) {
        const Friends = await UserService.getUserFriends(resp.friends);
        res.json(Friends);
    }
    else{
        res.json({message:"not found"})
    }
};

export default createKitty;