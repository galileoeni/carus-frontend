"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBusinessLogin } from "@/queries/business";
import cookie from "@/services/cookie";

const schema = z.object({
  identifier: z.string().trim().min(1, "Enter your email or phone number"),
  password: z.string().min(1, "Enter your password"),
});
type Values = z.infer<typeof schema>;

export const fieldClass = "w-full h-12 text-sm bg-[#F3F3F3] border-none";

export function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="text-xs text-red-500 mt-1">{message}</p>
  ) : null;
}

export default function BusinessLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useBusinessLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = (values: Values) =>
    mutate(values, {
      onSuccess: (res) => {
        cookie.set("auth-user", res.data);
        router.push("/business/dashboard");
      },
      onError: (error) => {
        if (
          error.response?.data?.message === "Please verify your email first" &&
          values.identifier.includes("@")
        ) {
          router.push(
            `/business/verify?email=${encodeURIComponent(values.identifier)}`,
          );
        }
      },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="identifier" className="mb-2 block font-bold">
          Work email or phone
        </Label>
        <Input
          id="identifier"
          autoComplete="username"
          placeholder="e.g. ops@yourcompany.com"
          className={fieldClass}
          {...register("identifier")}
        />
        <FieldError message={errors.identifier?.message} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="password" className="font-bold">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-60 font-bold"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className={`${fieldClass} pr-11`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-30 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <FieldError message={errors.password?.message} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer w-full h-12 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isPending && <Loader2 className="size-4 animate-spin" />}
        Log in
      </button>
    </form>
  );
}
