"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [signOutPending, setSignOutTransition] = useTransition();

  async function signOut() {
    setSignOutTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully...");
            router.push("/");
          },
        },
      });
    });
  }

  return (
    <div className="flex items-center justify-between p-4">
      <h1>Hello World</h1>
      {session ? (
        <div className="flex items-center gap-6">
          <p>{session.user.name}</p>
          <Button size="sm" onClick={signOut} disabled={signOutPending}>
            {signOutPending ? <LoadingButton /> : <>Logout</>}
          </Button>
        </div>
      ) : (
        <Link
          className={buttonVariants({
            size: "sm",
          })}
          href="/login"
        >
          Login
        </Link>
      )}
      <ThemeToggle />
    </div>
  );
}
