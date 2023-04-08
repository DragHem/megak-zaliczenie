import { NextApiRequest, NextApiResponse } from "next";
import { KittyService } from "../../../services";

const getKitty = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const kitty = await KittyService.getKitty(req.query.id);
  console.log(kitty);
  res.json(kitty);
};

export default getKitty;
