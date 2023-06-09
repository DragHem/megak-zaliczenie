import NextAuth, { Session } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { UserService } from "services";
import { PasswordModule } from "../../../lib/passwordModule";
import validator from "validator";
import { ErrorResponseStatus } from "interfaces/ErrorResponseStatus";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        if (!email || !password)
          throw {
            message: "Podano nieprawidłowe dane.",
            status: ErrorResponseStatus.error,
          };

        if (!validator.isEmail(email))
          throw {
            message: "Podany adres e-mail jest niepoprawny.",
            status: ErrorResponseStatus.error,
          };

        const user = await UserService.getUser(email);

        if (!user || user.isVirtual)
          throw {
            message: "Nie odnaleziono użytkownika o podanym adresie email.",
            status: ErrorResponseStatus.error,
          };

        if (!user.isActive)
          throw {
            message:
              "Musisz aktywować konto aby się zalogować. Sprawdź adress email w celu aktywacji konta.",
            status: ErrorResponseStatus.warning,
          };

        if (user.password) {
          const isPasswordValid = await PasswordModule.verifyHashedValue(
            password,
            user.password
          );

          if (!isPasswordValid)
            throw {
              message: "Wprowadzone nieprawidłowe hasło.",
              status: ErrorResponseStatus.error,
            };
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
