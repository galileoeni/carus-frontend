"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/auth";
import { ErrorAlert } from "@/components/error-component";
import cookie from "@/services/cookie";
import { toast } from "sonner";
import { GoogleButton } from "@/app/(auth)/google-auth/google-button";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isError, isPending, error } = useLogin({
    onSuccess(data) {
      cookie.set("auth-user", data.data);
      form.reset();
      router.push("/dashboard");
    },
    onError(error, variables) {
      if (error.response.data.message === "Please verify your email first") {
        toast.warning("Email not verified!", {
          description: "You are being redirected to verify your email...",
        });
        router.push(`/otp-verification?email=${variables.identifier}`);
      }
    },
  });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LoginSchema) => {
    const { email, ...rest } = values;
    const payload = {
      identifier: email,
      ...rest,
    };
    mutate(payload);
  };

  return (
    <>
      <section className="flex min-h-screen">
        {/* flex form and bg image */}
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col py-10 bg-white">
          {/* Logo */}
          <div className="px-3 md:px-5 mb-15">
            <Image
              aria-hidden={false}
              src="/logo.png"
              alt="Carus Logo"
              width={117}
              height={32}
              className="w-[117px] h-[32px]"
            />
          </div>

          <div className="flex-1 flex items-center justify-center px-7 md:px-20">
            <div className="w-full max-w-sm">
              <h1 className="text-xl md:text-[28px] font-bold">
                {" "}
                Hi, Welcome Back! 👋{" "}
              </h1>
              <p className="text-gray text-base mb-10">You have been missed!</p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold">
                          Email address
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-full py-6 text-sm bg-[#F3F3F3] border-none"
                            placeholder="e.g example@mail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
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

                  {/* Container for remember + forgot password */}
                  <div className="w-full max-w-[340px] flex flex-col items-start">
                    {/* Keep me logged in */}
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setRemember(!remember)}
                    >
                      {remember ? (
                        <FaCheckSquare className="text-xl text-[#026937]" />
                      ) : (
                        <FaRegSquare className="text-xl" />
                      )}
                      <span className="text-base">Keep me logged in.</span>
                    </div>

                    <div className="w-full flex justify-center mt-10 mb-5">
                      <Link
                        href="/forgot-password"
                        className="text-sm md:text-base text-[#026937] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {isError && <ErrorAlert error={error} />}

                  <Button
                    type="submit"
                    className="w-full py-6 text-sm md:text-base font-bold"
                    disabled={isPending || isLoading}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </Form>

              {/* Social button */}
              <GoogleButton isLoading={isLoading} setIsLoading={setIsLoading} />

              <div>
                <p className="text-center text-sm md:text-base mt-8">
                  Don&apos;t have an account?
                  <Link href="/register">
                    <span className="text-primary text-sm md:text-base">
                      {" "}
                      Register
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="relative hidden md:flex md:w-1/3 lg:w-1/2  overflow-hidden bg-gradient-to-t from-[#C7DCD2] via-[#E5EFEA] to-[#F9FBFA]">
          <div className="px-10 mt-20 z-10">
            <p className="text-primary mt-3 leading-relaxed">
              Ready to make a difference? Log in to continue your journey toward
              a greener planet. Remember, every scheduled pickup of plastics or
              electronics contributes to a cleaner environment and puts rewards
              in your wallet.
            </p>
          </div>
          <div className="absolute bottom-0 md:right-0 xl:left-1/2 xl:-translate-x-1/2">
            <Image
              src="/wastecan.png"
              alt="waste-can"
              width={400}
              height={400}
              className="object-contain md:w-[280px] lg:w-[350px] xl:w-[500px]"
            />
          </div>
        </aside>
      </section>
    </>
  );
}
