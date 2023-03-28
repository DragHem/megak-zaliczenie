import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import { UserService } from "../../../services/userService";
import { PasswordModule } from "../../../lib/passwordModule";
import validator from "validator";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@prov.com",
        },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        if (!email || !password) throw new Error("Podano nieprawidłowe dane.");

        if (!validator.isEmail(email))
          throw new Error("Podany adres e-mail jest niepoprawny.");

        const user = await UserService.getUser(email);

        if (!user || user.isVirtual)
          throw new Error(
            "Nie odnaleziono użytkownika o podanym adresie email."
          );

        if (!user.isActive)
          throw new Error(
            "Musisz aktywować konto aby się zalogować, sprawdź maila w celu aktywacji konta."
          );

        if (user.password) {
          const isPasswordValid = await PasswordModule.verifyHashedValue(
            password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Wprowadzone nieprawidłowe hasło.");
          }
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
