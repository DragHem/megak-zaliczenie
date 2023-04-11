import { DefaultUser } from "next-auth";

interface User extends DefaultUser {
  id: string;
}

declare module "next-auth" {
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}
