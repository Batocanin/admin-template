export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type ValidateRequestResponse = {
  data: { session: Session | null; user: User | null };
  message: string;
};

export type AuthResponse = {
  data: boolean;
  message: string;
};
