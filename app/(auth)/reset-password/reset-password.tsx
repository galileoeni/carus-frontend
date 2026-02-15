"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/queries/auth";
import { toast } from "sonner";
import { ErrorAlert } from "@/components/error-component";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function PasswordResetPage() {
  const { mutate, isSuccess, isError, error, isPending } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      toast.error("Link Invalid!", {
        description: "Check the reset link and try again!",
      });
      return;
    }
    mutate({ newPassword: values.password, token });
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-[500px] h-[300px] relative overflow-hidden bg-white shadow-[0_4px_20px_rgba(2,50,12,0.63)] rounded-xl flex items-center justify-center">
          <Image
            src="/waste.png"
            alt="Waste Bin"
            fill
            className="object-contain object-center"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h3>Successful!</h3>
            <p className="text-base mt-3">
              Your password has been
              <br /> successfully reset.
            </p>

            <div className="mt-7">
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[28px] font-bold">Reset Password</h2>
              <p className="text-base text-[#494949] mb-8">
                Enter your new password to reset your password
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* New Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                          />
                          <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                            className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                          />
                          <div
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isError && <ErrorAlert error={error} />}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="rounded-[10px] w-full py-6 text-sm md:text-base font-bold mt-8"
                >
                  {isPending ? "Reseting..." : "Reset Password"}
                </Button>
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
            className="object-contain md:w-[280px] lg:w-[350px] xl:w-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
