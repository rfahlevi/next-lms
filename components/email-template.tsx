import * as React from "react";

interface EmailTemplateProps {
  otp: string;
}

export function EmailTemplate({ otp }: EmailTemplateProps) {
  return (
    <div>
      <p className="font-sans">
        Your OTP is <strong>{otp}</strong>
      </p>
    </div>
  );
}
