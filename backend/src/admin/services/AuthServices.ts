import { hash, verify } from "@node-rs/argon2";

import { AppError } from "../../utils/AppError";
import prisma from "../../utils/prisma";
import { LoginSchema, SignupSchema } from "../schemas/AuthSchema";
import { Login, Register } from "../types/AuthTypes";
import { setSession } from "../models/AuthModels";
import { Response } from "express";
import { Role } from "@prisma/client";

export const signin = async (res: Response, credentials: Login) => {
  const { username, password } = LoginSchema.parse(credentials);

  const existingUser = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  });

  if (!existingUser) throw new AppError("Invalid username or password.");

  const validPassword = await verify(existingUser.password, password);

  if (!validPassword) throw new AppError("Invalid username or password.");

  await setSession(res, existingUser.id);

  return true;
};

export const signup = async (res: Response, credentials: Register) => {
  const { email, username, password } = SignupSchema.parse(credentials);

  const existingEmail = await prisma.user.findFirst({
    where: {
      email: { equals: email },
    },
  });

  if (existingEmail) throw new AppError("Email or username already exist.");

  const existingUsername = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  });

  if (existingUsername) throw new AppError("Email or username already exist.");

  const hashedPassword = await hash(password);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  return true;
};
