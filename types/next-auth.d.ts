import { DefaultUser } from "next-auth";

interface User extends DefaultUser {
  id: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      image: string;
      address: string;
      email: string;
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}
