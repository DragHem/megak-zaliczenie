import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UserService } from "../../../services";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await JSON.parse(req.body).users;
  console.log(users);
  const resp = await UserService.getUserFriends(users);

  res.json(resp);
};

export default getUsers;
