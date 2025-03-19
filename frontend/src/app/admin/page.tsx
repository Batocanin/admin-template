import { notFound, redirect } from "next/navigation";
import { validateRequest } from "./(auth)/actions/AuthActions";
import { isRedirectError } from "next/dist/client/components/redirect-error";

async function page() {
  try {
    const res = await validateRequest();

    if (res.data.session && res.data.user) redirect("/admin/dashboard");

    redirect("/admin/signin");
  } catch (error: unknown) {
    console.log(error)
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

export default page;
