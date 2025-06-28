"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [verifyPending, setVerifyTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const isOtpCompleted = otp.length === 6;

  function verifyAccount() {
    setVerifyTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account verified successfully!");
            router.push("/");
          },
          onError: () => {
            toast.error("Failed to verify account!");
          },
        },
      });
    });
  }

  return (
    <Suspense>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Please check your email
          </CardTitle>
          <CardDescription>
            We have sent OTP code to your email address. Please open the email
            and paste the code below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <InputOTP
              maxLength={6}
              className="gap-2"
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Enter 6-digit code sent to your email
            </p>
          </div>

          <Button
            className="w-full"
            variant={!isOtpCompleted ? "ghost" : "default"}
            onClick={verifyAccount}
            disabled={!isOtpCompleted || verifyPending}
          >
            {verifyPending ? <LoadingButton /> : "Verify Account"}
          </Button>
        </CardContent>
      </Card>
    </Suspense>
  );
}
