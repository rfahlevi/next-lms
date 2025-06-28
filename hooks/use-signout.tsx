"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useSignOut = () => {
  const router = useRouter();

  const handleSignOut = async function signOut() {
    const promise = authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: () => {
          throw new Error("Failed");
        },
      },
    });

    toast.promise(promise, {
      loading: "Signing out...",
      success: "Signed out successfully",
      error: "Failed to sign out",
    });

    await promise;
  };

  return { handleSignOut };
};

export default useSignOut;
