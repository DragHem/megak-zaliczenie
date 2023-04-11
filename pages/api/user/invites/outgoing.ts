import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ErrorResponseStatus } from "../../../../interfaces/ErrorResponseStatus";
import { authOptions } from "../../auth/[...nextauth]";
import { UserService } from "../../../../services";

type Resp =
  | {
      message: string;
      status: ErrorResponseStatus;
    }
  | (
      | {
          id: string;
          name: string | null;
          email: string;
          nickname: string | null;
        }[]
      | undefined
    );

async function UserFriendsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Resp>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    switch (req.method) {
      case "GET": {
        const user = await UserService.getUser(session.user.email);

        const outgoingInvites = await UserService.getOutgoingInvitations(
          user!.id
        );

        return res.json(outgoingInvites);
      }

      default:
        return res.json({
          message: "Błąd serwera!",
          status: ErrorResponseStatus.error,
        });
    }
  }
}

export default UserFriendsHandler;
