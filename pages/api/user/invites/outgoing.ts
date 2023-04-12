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
      case "POST": {
        try {
          const { id } = req.body as {
            id: string;
          };

          await UserService.cancelFriendRequest(session.user.id, id);

          return res.json({
            message: "Pomyślnie zaakceptowanie zaproszenie.",
            status: ErrorResponseStatus.success,
          });
        } catch (e) {
          return res.json({
            message: "Błąd serwera, prosimy spróbować ponownie później.",
            status: ErrorResponseStatus.error,
          });
        }
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
