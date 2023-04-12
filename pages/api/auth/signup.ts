import { NextApiRequest, NextApiResponse } from "next";

import validator from "validator";
import uniqueString from "unique-string";

import { UserService } from "services";
import { Signup, SignupResponse } from "interfaces/signup/signup";
import { ErrorResponseStatus } from "interfaces/ErrorResponseStatus";

import { PasswordModule } from "lib/passwordModule";
import { MailModule } from "lib/mailModule";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse>
) {
  if (req.method === "POST") {
    const { email, password, name, nickname }: Signup = req.body;

    if (!email || !password || !name || !nickname) {
      res.status(400).json({
        message: "Należy podać wszystkie dane.",
        status: ErrorResponseStatus.error,
      });
      return;
    }

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(name) ||
      validator.isEmpty(nickname)
    ) {
      res.status(400).json({
        message: "Należy podać wszystkie dane.",
        status: ErrorResponseStatus.error,
      });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({
        message: "Podany adres e-mail jest niepoprawny.",
        status: ErrorResponseStatus.error,
      });
      return;
    }

    try {
      const user = await UserService.getUser(email);

      if (user) {
        res.status(409).json({
          message: "Użytkownik o podanym adresie email już istnieje.",
          status: ErrorResponseStatus.error,
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

      const verifyMail = await MailModule.sendMail(
        email,
        "Kitty Project - Rejestracja",
        `https://kitty-eight.vercel.app/auth/activate/${activationLink}`,
        "Kitty Project - Rejestracja"
      );

      if (newUser && verifyMail) {
        res.status(201).json({
          message: "Rejestracja przebiegła pomyślnie.",
          status: ErrorResponseStatus.success,
        });
        return;
      }
    } catch (e) {
      res.status(409).json({
        message: "Błąd serwera, prosimy spróbować później.",
        status: ErrorResponseStatus.error,
      });
    }
  }
}

export default handler;
