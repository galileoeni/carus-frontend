"use client";

import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEditProfile, useGetProfile } from "@/queries/account";
import { Loader2 } from "lucide-react";
import { ErrorAlert } from "../error-component";

// ✅ Validation schema
const profileSchema = z.object({
  first_name: z.string().min(2, { message: "First name is too short" }),
  last_name: z.string().min(2, { message: "Last name is too short" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Enter 10 digits without the leading 0" }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
});

type ProfileSchema = z.infer<typeof profileSchema>;

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { data, isPending: isProfilePending } = useGetProfile();
  const { mutate, isPending, isError, error } = useEditProfile();

  const profileData = data?.data;

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const { reset } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // If there was a previous local preview, revoke it
      if (image && image.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
      setAvatarFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (profileData) {
      const userData = {
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
      };

      reset(userData);
      setImage(profileData.avatar || null);
    }
  }, [profileData, reset]);

  const onSubmit = (values: ProfileSchema) => {
    const formData = new FormData();
    // Loop through values to keep it DRY
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    mutate(formData);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-5 md:px-15 mt-5 bg-[#F3F3F3] rounded-[10px] pt-5 pb-20">
      <div className="w-full max-w-5xl">
        <p className="text-base lg:text-xl font-bold text-grey-90 mb-7">
          Personal Information
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="flex flex-col items-start mb-6 md:mb-0">
              <div className="relative inline-block">
                <div className="w-20 h-20 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-300">
                  {isProfilePending ? (
                    <div
                      className={`w-full h-full bg-grey-10 animate-pulse rounded-full`}
                    ></div>
                  ) : (
                    <Avatar className="size-full">
                      <AvatarImage
                        src={image || profileData?.avatar || ""}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>
                        {profileData?.first_name.slice(0, 3)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("profileImage")?.click()
                  }
                  className="absolute -bottom-1 md:-bottom-0 -right-0 z-10 grid place-items-center rounded-full w-7 h-7 md:w-10 md:h-10 bg-primary-60 hover:bg-primary-70 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-70"
                  aria-label="Upload profile image"
                >
                  <span className="relative block w-6 h-6 md:w-8 md:h-8">
                    <Image src="/plusgreen.png" alt="" fill />
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div className="w-full max-w-sm mx-auto space-y-6">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm lg:text-base font-bold">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="flex rounded-[10px] w-full py-5 text-sm !bg-white border-none"
                          placeholder="e.g John"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="lg-col-start-3">
                      <FormLabel className="text-sm lg:text-base font-bold">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-[10px] w-full py-5 text-sm !bg-white border-none"
                          placeholder="e.g Champion"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm lg:text-base font-bold">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-[10px] w-full py-5 text-sm !bg-white border-none"
                          placeholder="e.g example@mail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm lg:text-base font-bold">
                        Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-2 space-x-2">
                            <Image
                              src="/flag.svg"
                              alt="Nigeria Flag"
                              width={14}
                              height={10}
                              className="w-6 h-4 object-cover rounded-sm"
                            />
                            <span className="text-sm text-gray-700">+234</span>
                          </div>
                          <Input
                            className="rounded-[10px] w-full py-5 text-sm !bg-white border-none pl-20"
                            placeholder="e.g 812 345 6789"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm lg:text-base font-bold">
                        Home Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-[10px] w-full py-5 text-sm !bg-white border-none"
                          placeholder="Your address here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isError && <ErrorAlert error={error} />}
                {/* Button */}
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full py-5 font-bold"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Saving changes...</span>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
