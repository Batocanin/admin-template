import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SignupValues } from "../AuthSchema";
import { kyInstance } from "@/lib/ky";

function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: SignupValues) =>
      await kyInstance.post("auth/admin/signup", { json: values }).json(),
    onSuccess: async () => {
      setTimeout(() => {
        router.push("/admin/signin");
      }, 1000);
    },
  });
}

export default useSignup;
