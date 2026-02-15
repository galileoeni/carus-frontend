"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useResendOtp, useVerifyOtp } from "@/queries/auth";
import { ErrorAlert } from "@/components/error-component";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import z from "zod";
import cookie from "@/services/cookie";
import { useCountdown } from "@/hooks/useCountdown";
import Link from "next/link";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyRegistrationOTP() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { timeLeft, resetTimer } = useCountdown("otp_expiry", 10);
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isExpired = timeLeft <= 0;

  const { mutate, isPending, isError, error } = useVerifyOtp({
    onSuccess(data) {
      cookie.set("auth-user", data.data);
      router.push("/dashboard");
    },
  });

  const {
    mutate: resendOtp,
    isPending: resendingOtp,
    isError: isResendingError,
    error: errorResendingOtp,
  } = useResendOtp({
    onSuccess() {
      resetTimer();
      toast.success("OTP Resent", {
        description: "A new verification code has been sent to your email.",
      });
    },
  });

  const handleResentOTP = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    if (!email) {
      toast.error("Link Invalid!", {
        description: "Check the verification link and try again!",
      });
      return;
    }
    resendOtp({ email });
  };

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    if (!email) {
      toast.error("Link Invalid!", {
        description: "Check the verification link and try again!",
      });
      return;
    }
    mutate({ otp: values.otp, identifier: email });
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col py-10 bg-white">
        <div className="px-3 md:px-5 mb-15">
          <Image
            aria-hidden
            src="/logo.png"
            alt="Carus Logo"
            width={117}
            height={32}
          />
        </div>

        <div className="flex-1 flex px-5 md:px-20">
          <div className="w-full max-w-sm mx-auto">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[28px] font-bold">OTP Verification</h2>
              <p className="text-base text-[#494949] mb-8">
                Enter the verification code sent to your email below.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center space-y-4"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isExpired ? (
                  <p className="text-center my-7">
                    Code expires in{" "}
                    <span className="font-bold">{formatTime(timeLeft)}</span>
                  </p>
                ) : isResendingError ? (
                  <ErrorAlert error={errorResendingOtp} />
                ) : (
                  <p className="text-center my-7">
                    Didn&apos;t receive any code?{" "}
                    <button
                      type="button"
                      onClick={handleResentOTP}
                      className="text-center text-primary hover:underline cursor-pointer"
                    >
                      {resendingOtp ? "Requesting code..." : "Resend Code"}
                    </button>
                  </p>
                )}
                <Button
                  type="submit"
                  className="rounded-[10px] w-full py-6 text-sm md:text-base font-bold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
                {isError && <ErrorAlert error={error} />}
                {(isError && error.response.data.message) ===
                  "Account has already been verified" && (
                  <Link
                    href="/login"
                    className="text-center text-primary hover:underline cursor-pointer"
                  >
                    Proceed to Login
                  </Link>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="relative hidden md:flex md:w-1/3 lg:w-1/2  overflow-hidden bg-gradient-to-t from-[#C7DCD2] via-[#E5EFEA] to-[#F9FBFA]">
        <div className="absolute bottom-0 md:right-0 xl:left-1/2 xl:-translate-x-1/2">
          <Image
            src="/wastecan.png"
            alt="waste-can"
            width={400}
            height={400}
            className="object-contain md:w-[280px] lg:w-[350px] xl:w-[500px]"
          />
        </div>
      </div>
    </div>
  );
}
