import { Session, User } from "@prisma/client";

export type Login = {
  username: string;
  password: string;
};

export type Register = {
  email: string;
  username: string;
  password: string;
};

export type UserWithoutPassword = Omit<User, "password">;

export type SessionValidationResult =
  | { session: Session; user: UserWithoutPassword }
  | { session: null; user: null };
