"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCompleteGoogleSignup } from "@/queries/auth";
import { ErrorAlert } from "@/components/error-component";
import { Calendar } from "@/components/ui/calendar";
import cookie from "@/services/cookie";

const authSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Enter 10 digits without the leading 0" }),
  gender: z.string().nonempty({ message: "Please select a gender" }),
  dob: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: "Please enter date in DD/MM/YYYY format",
  }),
});

type Schema = z.infer<typeof authSchema>;

export default function Page() {
  const router = useRouter();
  const googleEmail = cookie.get("google-email");
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const { mutate, isError, isPending, error } = useCompleteGoogleSignup({
    onSuccess(data) {
      cookie.set("auth-user", data.data);
      router.push("/dashboard");
    },
  });

  useEffect(() => {
    if (!googleEmail) router.replace("/login");
  }, [googleEmail, router]);

  const form = useForm<Schema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      phone: "",
      gender: "",
      dob: "",
    },
  });

  const onSubmit = async (values: Schema) => {
    const { dob, ...rest } = values;

    const parsedDate = parse(dob, "dd/MM/yyyy", new Date());
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
      email: googleEmail,
    };
    console.log(payload);
    mutate(payload);
  };

  return (
    <>
      <div className="flex min-h-screen">
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
                Complete Account Registration
              </h1>
              <p className="text-gray text-base mb-10">
                Fill the following details to complete your profile!
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
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
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : new Date()
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

                  {isError && <ErrorAlert error={error} />}

                  <Button
                    type="submit"
                    className="w-full py-6 text-sm md:text-base font-bold"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </Form>

              <div>
                <p className="text-center text-sm md:text-base mt-8">
                  Need to login with email and password?
                  <Link href="/login">
                    <span className="text-primary text-sm md:text-base">
                      {" "}
                      Login
                    </span>
                  </Link>
                </p>
              </div>
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
    </>
  );
}
