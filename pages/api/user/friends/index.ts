import { NextApiRequest, NextApiResponse } from "next";
import { InviteFriend } from "../../../../hooks/usePost";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ErrorResponseStatus } from "../../../../interfaces/ErrorResponseStatus";
import { UserService } from "../../../../services";
import isEmail from "validator/lib/isEmail";

type Resp = {
  message: string;
  status: ErrorResponseStatus;
};

async function UserFriendsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Resp>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    switch (req.method) {
      case "POST": {
        const { email } = req.body as InviteFriend;

        if (!isEmail(email))
          return res.json({
            message: "Musisz podać prawidłowy adres email!",
            status: ErrorResponseStatus.error,
          });

        //Zaproszenie samego siebie +
        if (email === session.user.email)
          return res.json({
            message: "Nie możesz zaprosić samego siebie!",
            status: ErrorResponseStatus.warning,
          });

        const sessionUser = await UserService.getUser(session.user.email);
        const invUser = await UserService.getUser(email);

        //Jeżeli zapraszany użytkownik nie istnieje
        if (!invUser)
          return res.json({
            message: "Użytkownik o podanym adresie email nie istnieje.",
            status: ErrorResponseStatus.error,
          });

        //Jeżeli użytkownicy istnieją po obu stronach
        if (invUser && sessionUser) {
          const loggedUserOutgoingInv =
            await UserService.getOutgoingInvitations(sessionUser.id);

          const loggedUserOutgoingInvMatch =
            loggedUserOutgoingInv &&
            loggedUserOutgoingInv.find((user) => user.id === invUser.id);

          //Jeżeli zalogowany zaprasza użytkownika co ma już zaproszonego
          if (loggedUserOutgoingInvMatch) {
            return res.json({
              message: "Wybrany użytkownik został już prze ciebie zaproszony.",
              status: ErrorResponseStatus.warning,
            });
          }

          const invitedUserIncomingInv =
            await UserService.getOutgoingInvitations(invUser.id);

          const invitedUserComingInvMatch =
            invitedUserIncomingInv &&
            invitedUserIncomingInv.find((user) => user.id === sessionUser.id);

          //Jeżeli zalogowany zaprasza użytkownika co ma w przychodzących
          if (invitedUserComingInvMatch) {
            return res.json({
              message:
                "Zaproszenie od tego użytkownika znajduje się na liście oczekujących.",
              status: ErrorResponseStatus.warning,
            });
          }

          const resp = await UserService.sendFriendRequest(
            sessionUser.id,
            invUser.id
          );

          if (!resp)
            return res.json({
              message: "Cos poszło nie tak, spróbuj ponownie później.",
              status: ErrorResponseStatus.error,
            });

          return res.json({
            message: "Zaproszenie zostało wysłane!",
            status: ErrorResponseStatus.success,
          });
        }

        return;
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
