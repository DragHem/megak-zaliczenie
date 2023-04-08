import { NextApiRequest, NextApiResponse } from "next";

interface Req extends NextApiRequest {
  query: {
    email: string;
  };
}

type UserResponse = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  nickname: string | null;
};

type UserNotFoundResponse = { message: string };

async function UserHandler(
  req: Req,
  res: NextApiResponse<UserResponse | UserNotFoundResponse>
) {
  // switch (req.method) {
  //   case "GET": {
  //     try {
  //       const { email } = req.query;
  //
  //       const user = await UserService.getUser(email);
  //       const userResponse: UserResponse = _.omit(
  //         user,
  //         "password",
  //         "isActive",
  //         "isVirtual",
  //         "friends"
  //       );
  //
  //       if (user) {
  //         console.log(userResponse);
  //         res.json(userResponse);
  //       }
  //
  //       if (!user) {
  //         res.json({ message: "User not found" });
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       res.json({ message: "Server error" });
  //     }
  //   }
  // }
  res.json({ message: "User not found" });
}

export default UserHandler;
