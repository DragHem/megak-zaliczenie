import { compare, hash } from "bcrypt";

export abstract class PasswordModule {
  static async hashValue(password: string): Promise<string> {
    return hash(password, 12);
  }

  static async verifyHashedValue(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
