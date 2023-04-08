import { NextApiRequest, NextApiResponse } from "next";

const getKitty = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);

  res.json(req.query);
};

export default getKitty;
