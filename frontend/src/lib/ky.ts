import ky from "ky";

export const kyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  credentials: "include",
  // Ky handle http errors, for backend error handle need this hook.
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.ok) return;
        const errorBody = (await response.json()) as { message?: string };
        const error = new Error(
          errorBody.message || "An unexpected error occurred on the server."
        );
        throw error;
      },
    ],
  },
});
