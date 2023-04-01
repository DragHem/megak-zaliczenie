import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "services";
import validator from "validator";
import { Signup } from "../../../interfaces/signup/signup";
import { PasswordModule } from "../../../lib/passwordModule";
import { MailModule } from "../../../lib/mailModule";
import uniqueString from "unique-string";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name, nickname }: Signup = req.body;

    if (!email || !password || !name || !nickname) {
      res
        .status(400)
        .json({ message: "Należy podać wszystkie dane.", status: "Error" });
      return;
    }

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(name) ||
      validator.isEmpty(nickname)
    ) {
      res
        .status(400)
        .json({ message: "Należy podać wszystkie dane.", status: "Error" });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({
        message: "Podany adres e-mail jest niepoprawny.",
        status: "Error",
      });
      return;
    }

    try {
      const user = await UserService.getUser(email);

      if (user) {
        res.status(409).json({
          message: "Użytkownik o podanym adresie email już istnieje.",
          status: "Error",
        });
        return;
      }

      const hashedPassword = await PasswordModule.hashValue(password);

      const activationLink = uniqueString();

      const newUser = await UserService.createUser(
        name,
        email,
        hashedPassword,
        nickname,
        activationLink
      );

      //@todo Trzeba dodać link jak zrobimy już stronę do aktywacji.
      const verifyMail = await MailModule.sendMail(
        email,
        "Kitty Project - Rejestracja",
        `Tutaj będzie link - ${activationLink}`,
        "Kitty Project - Rejestracja"
      );

      if (newUser && verifyMail) {
        res.status(201).json({
          message: "Rejestracja przebiegła pomyślnie.",
          status: "Success",
        });
        return;
      }
    } catch (e) {
      res.status(409).json({
        message: "Błąd serwera, prosimy spróbować później.",
        status: "Error",
      });
    }
  }
}

export default handler;
