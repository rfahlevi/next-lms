"use client";

import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const { data: session } = authClient.useSession();

  if (session) {
    return redirect("/");
  }

  return <LoginForm />;
}
