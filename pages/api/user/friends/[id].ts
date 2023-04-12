import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ErrorResponseStatus } from "../../../../interfaces/ErrorResponseStatus";
import { UserService } from "../../../../services";

async function UserFriendsHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    switch (req.method) {
      case "DELETE": {
        try {
          const { id: friendId } = req.query;

          console.log({ friendId, userId: session.user.id });

          if (typeof friendId === "string") {
            await UserService.deleteFriend(session.user.id, friendId);

            return res.end();
          }
        } catch (e) {
          return res.json({
            message: "Błąd serwera!",
            status: ErrorResponseStatus.error,
          });
        }
        break;
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
