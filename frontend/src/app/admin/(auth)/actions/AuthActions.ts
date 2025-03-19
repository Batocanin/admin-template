"use server";

import { kyInstance } from "@/lib/ky";
import { AuthResponse, ValidateRequestResponse } from "../AuthTypes";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const validateRequest = async (): Promise<ValidateRequestResponse> => {
  const cookie = await cookies();
  const session = cookie.get("session");

  if (!session?.value)
    return {
      message: "Session not found.",
      data: { user: null, session: null },
    };

  const res = await kyInstance
    .get("auth/admin/validate-request", {
      headers: {
        Cookie: `session=${session.value}`,
      },
    })
    .json<ValidateRequestResponse>();

  return res;
};

export const logout = async () => {
  try {
    const cookie = await cookies();
    const session = cookie.get("session");

    if (!session?.value) redirect("/admin/signin");

    await kyInstance
      .post("auth/admin/logout", {
        headers: {
          Cookie: `session=${session.value}`,
        },
      })
      .json<AuthResponse>();

    // Deleting cookie on client side for admin sign in
    cookie.set("session", "", { maxAge: 0, path: "/admin" });

    redirect("/admin/signin");
  } catch (error) {
    console.log("An error occured while trying to log out:", error);
    notFound();
  }
};
