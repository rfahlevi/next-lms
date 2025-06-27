"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
export default function LoginForm() {
  const [githubPending, setGithubTransition] = useTransition();
  const [emailPending, setEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const router = useRouter();

  function signInWithGithub() {
    setGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, you will be redirected...");
          },
          onError: (error) => {
            console.log("Error ", error);
            toast.error("Something went wrong, please try again.");
          },
        },
      });
    });
  }

  function signInWithEmail() {
    setEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully sent verification code to your email!");
            setEmail("");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Failed to send verification code!");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>
          Login with your email or github account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          variant="outline"
          disabled={githubPending}
          className="w-full"
          onClick={signInWithGithub}
        >
          {githubPending ? (
            <LoadingButton />
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign In with Github
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              disabled={emailPending}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <LoadingButton />
            ) : (
              <>
                <Send className="size-4" />
                Continue with Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
