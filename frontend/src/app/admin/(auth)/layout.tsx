"use server";

import { Languages } from "lucide-react";
import { validateRequest } from "./actions/AuthActions";
import { notFound, redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const req = await validateRequest();

    if (req.data.session && req.data.user) redirect("/admin/dashboard");

    return (
      <>
        {children}
        <Languages className="absolute top-8 right-8 cursor-pointer" />
      </>
    );
  } catch (error: unknown) {
    console.log(error);
    if (isRedirectError(error)) throw error;
    if (error instanceof Response) {
      const errorData = await error.json().catch(() => null);
      if (error.status === 401) {
        redirect("/admin/signin");
      }
      throw new Error(
        errorData?.message || "An unexpected error occurred on the server."
      );
    } else if (error instanceof Error) {
      notFound();
    }
    throw new Error("An unexpected error occurred on the server.");
  }
}

export default layout;
