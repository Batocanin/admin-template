import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
      invalid_type_error: "Username must be a string.",
    })
    .min(1, { message: "Username is required." }),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .min(1, { message: "Password is required." }),
});

export type LoginValues = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z
    .string({
      required_error: "Username is required.",
      invalid_type_error: "Username must be a string.",
    })
    .min(1, { message: "Username is required." }),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .min(1, { message: "Password is required." }),
});

export type SignupValues = z.infer<typeof SignupSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
