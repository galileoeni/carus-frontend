"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, MailCheck } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useBusinessResendOtp, useBusinessVerify } from "@/queries/business";
import cookie from "@/services/cookie";

const RESEND_AFTER_S = 60;

export default function BusinessVerifyForm() {
  const router = useRouter();
  const email = useSearchParams().get("email") ?? "";
  const [otp, setOtp] = useState("");
  const [wait, setWait] = useState(RESEND_AFTER_S);
  const verify = useBusinessVerify();
  const resend = useBusinessResendOtp();

  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const submit = (code: string) =>
    verify.mutate(
      { identifier: email, otp: code },
      {
        onSuccess: (res) => {
          cookie.set("auth-user", res.data);
          router.push("/business/dashboard");
        },
      },
    );

  if (!email) {
    return (
      <p className="text-grey-50">
        This link is missing your email address. Please log in again and
        we&apos;ll send you a new code.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl bg-primary-10/60 p-4 mb-8">
        <MailCheck className="size-6 text-primary-60 shrink-0" />
        <p className="text-sm">
          We sent a 6-digit code to <span className="font-bold">{email}</span>
        </p>
      </div>

      <InputOTP
        maxLength={6}
        value={otp}
        onChange={(v) => {
          setOtp(v);
          if (v.length === 6) submit(v);
        }}
        disabled={verify.isPending}
      >
        <InputOTPGroup className="w-full justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="size-12 md:size-14 text-lg font-bold bg-[#F3F3F3] border-none rounded-lg"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <button
        type="button"
        onClick={() => submit(otp)}
        disabled={otp.length !== 6 || verify.isPending}
        className="cursor-pointer mt-8 w-full h-12 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {verify.isPending && <Loader2 className="size-4 animate-spin" />}
        Verify email
      </button>

      <p className="mt-6 text-center text-sm text-grey-50">
        Didn&apos;t get it?{" "}
        {wait > 0 ? (
          <span>Resend in {wait}s</span>
        ) : (
          <button
            type="button"
            disabled={resend.isPending}
            onClick={() =>
              resend.mutate(email, { onSuccess: () => setWait(RESEND_AFTER_S) })
            }
            className="cursor-pointer text-primary-60 font-bold"
          >
            Resend code
          </button>
        )}
      </p>
    </div>
  );
}
