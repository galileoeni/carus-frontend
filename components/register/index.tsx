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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/queries/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ErrorAlert } from "@/components/error-component";
import { GoogleButton } from "@/app/(auth)/google-auth/google-button";
import { format, parse, isValid } from "date-fns";

const signupSchema = z.object({
  option: z.enum(["individual", "business"]),
  first_name: z.string().min(2, { message: "First name is too short" }),
  last_name: z.string().min(2, { message: "Last name is too short" }),
  email: z.email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^(\d{10}|\d{11}|\+234\d{10})$/, {
      message: "Enter a valid phone number",
    })
    .transform((val) => {
      if (val.length === 11) {
        return val.substring(1);
      }
      if (val.startsWith("+234")) {
        return val.substring(4);
      }
      return val;
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter",
    })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
      message: "Password must include at least one special character",
    }),
  address: z.string().optional(),
  gender: z.string().nonempty({ message: "Please select a gender" }),
  dob: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: "Please enter date in DD/MM/YYYY format",
  }),
  companyName: z.string().optional(),
  cac: z.string().optional(),
});
type SignupSchema = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      option: "individual",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      gender: "",
      dob: "",
      companyName: "",
      cac: "",
    },
  });
  const { mutate, isPending, isError, error } = useRegister({
    onSuccess(_data, variables) {
      form.reset();
      router.push(`/otp-verification?email=${variables.email}`);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [option, setOption] = useState<"individual" | "business">("individual");
  const [page, setPage] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleContinue = async () => {
    const isValid = await form.trigger(
      option === "individual"
        ? ["first_name", "last_name", "email", "phone", "password"]
        : ["companyName", "email", "password"],
    );
    if (isValid) setPage(2);
  };

  const onSubmit = (values: SignupSchema) => {
    if (!accepted) {
      toast.info("You must accept the Terms and Conditions to proceed.");
      return;
    }
    const { option, ...rest } = values;
    console.log("🚀 Account type:", option);

    const parsedDate = parse(rest.dob, "dd/MM/yyyy", new Date());
    if (!isValid(parsedDate)) {
      form.setError("dob", {
        type: "manual",
        message: "Please enter a valid date.",
      });
      return;
    }

    const formattedDob = format(parsedDate, "yyyy-MM-dd");

    const payload = {
      ...rest,
      dob: formattedDob,
      country_code: "ng",
    };
    //@ts-expect-error dob is formatted to string
    mutate(payload);
  };

  return (
    <div className="flex min-h-screen">
      {/* flex form and bg image */}
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col py-10 bg-white">
        {/* Logo */}
        <Link href="/" className="px-3 md:px-5 mb-15">
          <Image
            aria-hidden
            src="/logo.png"
            alt="Carus Logo"
            width={117}
            height={32}
            className="w-[117px] h-[32px]"
          />
        </Link>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-5 md:px-20">
          <div className="w-full max-w-sm">
            <h1 className="text-xl md:text-[28px] font-bold pb-5">
              Create Your Carus Recycling Account
            </h1>

            <div className="w-full flex gap-2 md:gap-4 items-center justify-between rounded-full bg-[#F3F3F3] h-[56px] px-3 py-2 mb-5">
              <Button
                onClick={() => {
                  setOption("individual");
                  setPage(1);
                }}
                className={`flex-1 rounded-full py-5 px-6 lg:px-8 text-center text-sm md:text-base hover:text-white ${
                  option === "individual"
                    ? "bg-[#CCE1D7] text-[#4F4F4F]"
                    : "bg-white text-[#4F4F4F]"
                }`}
              >
                As an Individual
              </Button>

              <Button
                onClick={() => {
                  toast.info("This is a coming soon feature!");
                }}
                className={`flex-1 rounded-full py-5 px-4 lg:px-8 text-center text-sm md:text-base hover:text-white ${
                  option === "business"
                    ? "bg-[#CCE1D7] text-[#4F4F4F]"
                    : "bg-white text-[#4F4F4F]"
                }`}
              >
                As a Business
              </Button>
            </div>

            {/*Step Indicator */}
            <div className="flex items-center my-6">
              <div
                className={`h-[2px] w-37 rounded-[30px] mr-2 ${
                  page >= 1 ? "bg-[#026937]" : "bg-[#D3D3D3]"
                }`}
              />
              <button
                onClick={() => setPage(1)}
                className={`w-4 h-4 flex items-center mr-2 justify-center rounded-full text-white text-[9px] 
        ${page >= 1 ? "bg-[#026937]" : "bg-[#D3D3D3]"}`}
              >
                1
              </button>
              <div
                className={`h-[2px] w-37 rounded-[30px] mr-2 ${
                  page >= 2 ? "bg-[#026937]" : "bg-[#D3D3D3]"
                }`}
              />
              <div
                className={`w-4 h-4 flex items-center justify-center rounded-full text-white text-[9px] 
        ${page >= 2 ? "bg-[#026937]" : "bg-[#D3D3D3]"}`}
              >
                2
              </div>
            </div>
            {isError && <ErrorAlert error={error} />}
            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/*Individual & Business Page 1 */}
                {option === "individual" && page === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="John"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="Champion"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="example@mail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              {/* Nigeria Flag + Country Code */}
                              <div className="absolute inset-y-0 left-0 flex items-center pl-2 space-x-2">
                                <Image
                                  src="/flag.svg"
                                  alt="Nigeria Flag"
                                  className="w-6 h-4 object-cover rounded-sm"
                                  width={14}
                                  height={10}
                                />
                                <span className="text-sm font-semibold text-gray-700">
                                  +234
                                </span>
                              </div>

                              {/* Input field */}
                              <Input
                                className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none pl-20"
                                placeholder="812 345 6789"
                                {...field}
                              />
                            </div>
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
                            Enter Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
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
                  </>
                )}

                {option === "business" && page === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Company Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="John Champion"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="example@mail.com"
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
                            Enter Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
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
                  </>
                )}

                {page === 1 && (
                  <Button
                    type="button"
                    onClick={handleContinue}
                    className="rounded-[10px] w-full py-6 text-sm md:text-base font-bold mt-7"
                  >
                    Continue
                  </Button>
                )}

                {/* Individual & Business Page 2 */}
                {option === "individual" && page === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Home Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="2 Atunrase Estate, Gbagada, Lagos"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-base font-bold">
                            Date of Birth
                          </FormLabel>
                          <Popover
                            open={openDatePicker}
                            onOpenChange={setOpenDatePicker}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={`rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none justify-between text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                {field.value ? (
                                  field.value
                                ) : (
                                  <span className="text-gray-400">
                                    DD/MM/YYYY
                                  </span>
                                )}
                                <CalendarIcon className="flex justify-end h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : new Date()
                                }
                                onSelect={(selected) => {
                                  if (selected) {
                                    field.onChange(
                                      format(selected, "dd/MM/yyyy"),
                                    );
                                    setOpenDatePicker(false);
                                  }
                                }}
                                autoFocus
                                captionLayout="dropdown"
                                startMonth={new Date(1900, 0)}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Select Gender
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                className="rounded-[10px] w-full pr-8 pl-3 py-4 text-sm bg-[#F3F3F3] border-none leading-5 appearance-none"
                              >
                                <option value="">--Select Gender--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                              </select>

                              <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
                                <Image
                                  src="/arrow-down.svg"
                                  alt="arrow-down"
                                  aria-hidden={true}
                                  width={16}
                                  height={16}
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {option === "business" && page === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="cac"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            C.A.C Registration Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="987654321"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              {/* Nigeria Flag + Country Code */}
                              <div className="absolute inset-y-0 left-0 flex items-center pl-2 space-x-2">
                                <Image
                                  src="/flag.svg"
                                  alt="Nigeria Flag"
                                  className="w-6 h-4 object-cover rounded-sm"
                                  width={14}
                                  height={10}
                                />
                                <span className="text-sm font-semibold text-gray-700">
                                  +234
                                </span>
                              </div>

                              {/* Input field */}
                              <Input
                                className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none pl-20"
                                placeholder="812 345 6789"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold">
                            Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                              placeholder="2 Atunrase Estate, Gbagada, Lagos"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {page === 2 && (
                  <>
                    <div className="mt-3 block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        value=""
                        onClick={() => setAccepted(!accepted)}
                        id="checkboxDefault"
                      />
                      <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer text-sm"
                        htmlFor="checkboxDefault"
                      >
                        Terms & Conditions
                      </label>
                    </div>
                    <p className="mt-7 text-sm md:text-base text-[#494949]">
                      By checking terms and conditions, you agree to Carus terms
                      and conditions.{" "}
                    </p>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="rounded-[10px] w-full py-6 text-sm md:text-base font-bold"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="animate-spin" />
                          <span>Signing up...</span>
                        </>
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                    {isError && <ErrorAlert error={error} />}
                  </>
                )}
              </form>
            </Form>

            {/* Social button */}
            <GoogleButton isLoading={isLoading} setIsLoading={setIsLoading} />

            <p className="text-center text-sm md:text-base mt-8">
              Have an account?
              <Link href="/login">
                <span className="text-primary text-sm md:text-base">
                  {" "}
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden md:flex md:w-1/3 lg:w-1/2  overflow-hidden bg-gradient-to-t from-[#C7DCD2] via-[#E5EFEA] to-[#F9FBFA]">
        <div className="w-full md:max-w-[300px] lg:max-w-[400px] px-10 mt-20 relative z-10">
          <h3 className="text-primary text-xl font-bold">
            Register an Account
          </h3>
          <p className="text-primary mt-3">
            Register an account as an individual or business to access all the
            features of Carus. Join our community who are making a difference
            for our planet. It&apos;s quick, easy and free!
          </p>
        </div>

        {option === "individual" && (
          <div className="absolute bottom-0 md:right-0 xl:left-1/2 xl:-translate-x-1/2">
            <Image
              src="/wastecan.png"
              alt="waste-can"
              width={400}
              height={400}
              className="object-contain md:w-[280px] lg:w-[350px] xl:w-[500px]"
            />
          </div>
        )}

        {option === "business" && (
          <>
            <div className="absolute bottom-0 md:right-0">
              <Image
                src="/truck.png"
                alt="Waste Bin"
                width={400}
                height={400}
                className="object-contain md:w-[300px] lg:w-[400px] xl:w-[550px]"
              />
            </div>

            <div className="absolute bottom-0  right-[20%] md:right-[25%] lg:right-[28%] xl:right-[30%]">
              <Image
                src="/trash.png"
                alt="Waste Bin"
                width={400}
                height={400}
                className="object-contain md:w-[80px] xl:w-[100px]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
