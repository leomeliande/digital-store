import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Você saiu com sucesso.");

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Não foi possível sair. Tente novamente.");
    }
  };

  return { signOut };
};
