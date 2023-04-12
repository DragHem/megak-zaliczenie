import { NextApiRequest, NextApiResponse } from "next";
import { KittyService } from "../../../services";

const getKitty = async (req: NextApiRequest, res: NextApiResponse) => {

  const kitty = await KittyService.getKitty(req.query.id as string);

  res.json(kitty);
};

export default getKitty;
