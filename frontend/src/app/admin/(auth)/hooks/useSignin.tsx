import { useMutation } from "@tanstack/react-query";
import { LoginValues } from "../AuthSchema";
import { kyInstance } from "@/lib/ky";
import { useRouter } from "next/navigation";

function useSignin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginValues) => {
      return await kyInstance
        .post("auth/admin/signin", { json: values })
        .json();
    },
    onSuccess: () => {
      router.push("/admin/dashboard");
    },
  });
}

export default useSignin;
