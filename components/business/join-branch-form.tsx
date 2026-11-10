"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Eye, EyeOff, Link2Off, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lagosLGAs } from "@/components/lagosLGAs";
import { LoadingComponent } from "@/components/loading";
import { industryLabel } from "@/lib/business";
import { useBranchInviteInfo, useJoinBranch } from "@/queries/business";
import { FieldError, fieldClass } from "./login-form";

const schema = z
  .object({
    branchName: z.string().trim().min(2, "Give this location a name"),
    address: z.string().trim().min(5, "Enter the pickup address"),
    city: z.enum(lagosLGAs as [string, ...string[]], {
      message: "Choose your LGA",
    }),
    first_name: z.string().trim().min(1, "Enter your first name"),
    last_name: z.string().trim().min(1, "Enter your last name"),
    contactRole: z.string().trim().max(60).optional(),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .regex(/^0?\d{10}$/, "Enter a valid Nigerian phone number"),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
        "At least 8 characters, with an uppercase and a lowercase letter",
      ),
    confirmPassword: z.string(),
    agree: z.literal(true, { message: "Please accept to continue" }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

type Values = z.infer<typeof schema>;

const selectClass = `${fieldClass} rounded-md px-3 appearance-none`;

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block font-bold">
        {label}{" "}
        {optional && (
          <span className="font-normal text-grey-30">(optional)</span>
        )}
      </Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

// Sign-up for a branch, opened from the head office's private link
export default function JoinBranchForm({ token }: { token: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const invite = useBranchInviteInfo(token);
  const join = useJoinBranch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    values: invite.data
      ? ({ branchName: invite.data.data.branchName ?? "" } as Values)
      : undefined,
    resetOptions: { keepDirtyValues: true },
  });

  if (invite.isLoading) {
    return (
      <div className="flex justify-center py-10">
        <LoadingComponent description="Checking your link..." />
      </div>
    );
  }
  if (invite.error || !invite.data) {
    return (
      <div className="rounded-2xl border border-primary-10 p-6 text-center">
        <Link2Off className="size-8 mx-auto text-grey-30" />
        <p className="mt-3 font-bold">This link doesn&apos;t work</p>
        <p className="mt-1 text-sm text-grey-50">
          It may have been used already, cancelled or expired. Ask your head
          office for a new link.
        </p>
        <Link
          href="/business/login"
          className="inline-block mt-5 text-primary-60 font-bold"
        >
          Go to business login
        </Link>
      </div>
    );
  }

  const info = invite.data.data;
  const onSubmit = (v: Values) =>
    join.mutate(
      {
        token,
        branchName: v.branchName,
        address: v.address,
        city: v.city,
        first_name: v.first_name,
        last_name: v.last_name,
        contactRole: v.contactRole || undefined,
        email: v.email,
        phone: v.phone,
        country_code: "+234",
        password: v.password,
      },
      {
        onSuccess: () =>
          router.push(
            `/business/verify?email=${encodeURIComponent(v.email.toLowerCase())}`,
          ),
      },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="flex items-center gap-3 rounded-xl bg-primary-10/60 p-4">
        <Building2 className="size-6 text-primary-60 shrink-0" />
        <p className="text-sm">
          You&apos;re joining{" "}
          <span className="font-bold">{info.companyName}</span> (
          {industryLabel(info.industry)}) as a branch. Your head office will see
          this location&apos;s pickups and data.
        </p>
      </div>

      <h2 className="pt-2 text-sm font-bold uppercase tracking-widest text-primary-60">
        This location
      </h2>
      <Field
        id="branchName"
        label="Branch name"
        error={errors.branchName?.message}
      >
        <Input
          id="branchName"
          placeholder="e.g. Ikeja branch"
          className={fieldClass}
          {...register("branchName")}
        />
      </Field>
      <Field
        id="address"
        label="Pickup address"
        error={errors.address?.message}
      >
        <Input
          id="address"
          autoComplete="street-address"
          placeholder="Street address of this branch"
          className={fieldClass}
          {...register("address")}
        />
      </Field>
      <Field id="city" label="LGA" error={errors.city?.message}>
        <select
          id="city"
          className={selectClass}
          defaultValue=""
          {...register("city")}
        >
          <option value="" disabled>
            Choose the LGA
          </option>
          {lagosLGAs.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
      </Field>

      <h2 className="pt-4 text-sm font-bold uppercase tracking-widest text-primary-60">
        Your login
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <Field
          id="first_name"
          label="First name"
          error={errors.first_name?.message}
        >
          <Input
            id="first_name"
            autoComplete="given-name"
            className={fieldClass}
            {...register("first_name")}
          />
        </Field>
        <Field
          id="last_name"
          label="Last name"
          error={errors.last_name?.message}
        >
          <Input
            id="last_name"
            autoComplete="family-name"
            className={fieldClass}
            {...register("last_name")}
          />
        </Field>
      </div>
      <Field id="contactRole" label="Your role" optional>
        <Input
          id="contactRole"
          autoComplete="organization-title"
          placeholder="e.g. Branch Manager"
          className={fieldClass}
          {...register("contactRole")}
        />
      </Field>
      <Field id="email" label="Work email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourcompany.com"
          className={fieldClass}
          {...register("email")}
        />
      </Field>
      <Field id="phone" label="Phone number" error={errors.phone?.message}>
        <div className="flex gap-2">
          <span className="h-12 px-3 rounded-md bg-[#F3F3F3] flex items-center text-sm font-bold text-grey-50">
            +234
          </span>
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="803 123 4567"
            className={fieldClass}
            {...register("phone")}
          />
        </div>
      </Field>
      <Field id="password" label="Password" error={errors.password?.message}>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
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
      </Field>
      <Field
        id="confirmPassword"
        label="Confirm password"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          className={fieldClass}
          {...register("confirmPassword")}
        />
      </Field>
      <label className="flex items-start gap-3 text-sm text-grey-50 cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 size-4 accent-[#026937]"
          {...register("agree")}
        />
        <span>
          I agree to the{" "}
          <Link
            href="/terms"
            target="_blank"
            className="text-primary-60 font-bold"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="text-primary-60 font-bold"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      <FieldError message={errors.agree?.message} />

      <button
        type="submit"
        disabled={join.isPending}
        className="cursor-pointer w-full h-12 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {join.isPending && <Loader2 className="size-4 animate-spin" />}
        Create branch account
      </button>
    </form>
  );
}
