// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const hello = async (req: NextApiRequest, res: NextApiResponse) => {
  // res.status(200).json({ name: 'John Doe' })

  const session = await getServerSession(req, res, authOptions);

  res.json(session);
};

export default hello;
