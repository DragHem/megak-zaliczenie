import { NextApiRequest, NextApiResponse } from "next";
import { KittyService } from "../../../services";

const kittyEnd = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, isEnded }: { id: string; isEnded: boolean } = req.body;

  await KittyService.changeStatus(id, isEnded);

  res.end();
};

export default kittyEnd;
