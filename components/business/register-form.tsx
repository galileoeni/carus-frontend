"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Check, Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lagosLGAs } from "@/components/lagosLGAs";
import { INDUSTRIES, MATERIALS } from "@/lib/business";
import { useBusinessRegister } from "@/queries/business";
import { FieldError, fieldClass } from "./login-form";

const schema = z
  .object({
    companyName: z.string().trim().min(2, "Enter your company name"),
    industry: z.enum(INDUSTRIES.map((i) => i.value) as [string, ...string[]], {
      message: "Choose your industry",
    }),
    cacNumber: z.string().trim().max(30).optional(),
    address: z.string().trim().min(5, "Enter the pickup address"),
    city: z.enum(lagosLGAs as [string, ...string[]], {
      message: "Choose your LGA",
    }),
    wasteTypes: z.array(z.string()).min(1, "Pick at least one type of waste"),
    estimatedMonthlyKg: z.string().optional(),
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

const STEPS: { title: string; fields: FieldPath<Values>[] }[] = [
  {
    title: "Business",
    fields: ["companyName", "industry", "cacNumber", "address", "city"],
  },
  { title: "Waste", fields: ["wasteTypes", "estimatedMonthlyKg"] },
  {
    title: "Login",
    fields: [
      "first_name",
      "last_name",
      "contactRole",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "agree",
    ],
  },
];

const VOLUME_OPTIONS = [
  { value: "", label: "Not sure yet" },
  { value: "50", label: "Under 100 kg" },
  { value: "300", label: "100 – 500 kg" },
  { value: "750", label: "500 kg – 1 tonne" },
  { value: "3000", label: "1 – 5 tonnes" },
  { value: "7500", label: "Over 5 tonnes" },
];

const selectClass = `${fieldClass} rounded-md px-3 appearance-none`;

export default function BusinessRegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useBusinessRegister();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { wasteTypes: [], estimatedMonthlyKg: "" },
  });

  const wasteTypes = watch("wasteTypes");
  const toggleWaste = (value: string) =>
    setValue(
      "wasteTypes",
      wasteTypes.includes(value)
        ? wasteTypes.filter((w) => w !== value)
        : [...wasteTypes, value],
      { shouldValidate: true },
    );

  const next = async () => {
    if (await trigger(STEPS[step].fields)) setStep((s) => s + 1);
  };

  const onSubmit = (v: Values) =>
    mutate(
      {
        companyName: v.companyName,
        industry: v.industry,
        cacNumber: v.cacNumber || undefined,
        address: v.address,
        city: v.city,
        wasteTypes: v.wasteTypes,
        estimatedMonthlyKg: v.estimatedMonthlyKg
          ? Number(v.estimatedMonthlyKg)
          : null,
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Progress */}
      <ol className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition-colors ${
                i <= step ? "bg-primary-60" : "bg-grey-10"
              }`}
            />
            <p
              className={`mt-2 text-xs font-bold ${
                i === step ? "text-primary-60" : "text-grey-30"
              }`}
            >
              {i + 1}. {s.title}
            </p>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-5">
          <div>
            <Label htmlFor="companyName" className="mb-2 block font-bold">
              Company name
            </Label>
            <Input
              id="companyName"
              autoComplete="organization"
              placeholder="e.g. Mama Put Foods Ltd"
              className={fieldClass}
              {...register("companyName")}
            />
            <FieldError message={errors.companyName?.message} />
          </div>
          <div>
            <Label htmlFor="industry" className="mb-2 block font-bold">
              Industry
            </Label>
            <select
              id="industry"
              className={selectClass}
              defaultValue=""
              {...register("industry")}
            >
              <option value="" disabled>
                Choose your industry
              </option>
              {INDUSTRIES.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.industry?.message} />
          </div>
          <div>
            <Label htmlFor="cacNumber" className="mb-2 block font-bold">
              CAC number{" "}
              <span className="font-normal text-grey-30">(optional)</span>
            </Label>
            <Input
              id="cacNumber"
              placeholder="e.g. RC 1234567"
              className={fieldClass}
              {...register("cacNumber")}
            />
          </div>
          <div>
            <Label htmlFor="address" className="mb-2 block font-bold">
              Pickup address
            </Label>
            <Input
              id="address"
              autoComplete="street-address"
              placeholder="Where we collect from"
              className={fieldClass}
              {...register("address")}
            />
            <FieldError message={errors.address?.message} />
          </div>
          <div>
            <Label htmlFor="city" className="mb-2 block font-bold">
              LGA (Lagos)
            </Label>
            <select
              id="city"
              className={selectClass}
              defaultValue=""
              {...register("city")}
            >
              <option value="" disabled>
                Choose your LGA
              </option>
              {lagosLGAs.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
            <FieldError message={errors.city?.message} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 font-bold">What will you hand over?</p>
            <div className="grid grid-cols-2 gap-3">
              {MATERIALS.map((m) => {
                const selected = wasteTypes.includes(m.value);
                return (
                  <button
                    type="button"
                    key={m.value}
                    onClick={() => toggleWaste(m.value)}
                    aria-pressed={selected}
                    className={`cursor-pointer relative flex items-center gap-3 rounded-xl border-2 p-3 text-left text-sm font-bold transition-colors ${
                      selected
                        ? "border-primary-60 bg-primary-10/60"
                        : "border-grey-10 hover:border-primary-30"
                    }`}
                  >
                    <Image src={m.icon} alt="" width={28} height={28} />
                    {m.label}
                    {selected && (
                      <span className="absolute top-2 right-2 size-5 rounded-full bg-primary-60 text-white flex items-center justify-center">
                        <Check className="size-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <FieldError message={errors.wasteTypes?.message} />
          </div>
          <div>
            <Label htmlFor="volume" className="mb-2 block font-bold">
              Roughly how much each month?
            </Label>
            <select
              id="volume"
              className={selectClass}
              {...register("estimatedMonthlyKg")}
            >
              {VOLUME_OPTIONS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="first_name" className="mb-2 block font-bold">
                First name
              </Label>
              <Input
                id="first_name"
                autoComplete="given-name"
                className={fieldClass}
                {...register("first_name")}
              />
              <FieldError message={errors.first_name?.message} />
            </div>
            <div>
              <Label htmlFor="last_name" className="mb-2 block font-bold">
                Last name
              </Label>
              <Input
                id="last_name"
                autoComplete="family-name"
                className={fieldClass}
                {...register("last_name")}
              />
              <FieldError message={errors.last_name?.message} />
            </div>
          </div>
          <div>
            <Label htmlFor="contactRole" className="mb-2 block font-bold">
              Your role{" "}
              <span className="font-normal text-grey-30">(optional)</span>
            </Label>
            <Input
              id="contactRole"
              autoComplete="organization-title"
              placeholder="e.g. Operations Manager"
              className={fieldClass}
              {...register("contactRole")}
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block font-bold">
              Work email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@yourcompany.com"
              className={fieldClass}
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <Label htmlFor="phone" className="mb-2 block font-bold">
              Phone number
            </Label>
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
            <FieldError message={errors.phone?.message} />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2 block font-bold">
              Password
            </Label>
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
            <FieldError message={errors.password?.message} />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="mb-2 block font-bold">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className={fieldClass}
              {...register("confirmPassword")}
            />
            <FieldError message={errors.confirmPassword?.message} />
          </div>
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
        </div>
      )}

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            aria-label="Back"
            className="cursor-pointer h-12 w-12 shrink-0 rounded-[10px] bg-[#F3F3F3] flex items-center justify-center"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        {step < STEPS.length - 1 ? (
          // Separate keys so React doesn't reuse this element as the submit
          // button, which could submit the form on the "Continue" click
          <button
            key="continue"
            type="button"
            onClick={next}
            className="cursor-pointer flex-1 h-12 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white font-bold"
          >
            Continue
          </button>
        ) : (
          <button
            key="submit"
            type="submit"
            disabled={isPending}
            className="cursor-pointer flex-1 h-12 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Create business account
          </button>
        )}
      </div>
    </form>
  );
}
