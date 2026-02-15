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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNewPassword } from "@/queries/account";

// ✅ Validation schema
const profileSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileSchema = z.infer<typeof profileSchema>;

export default function Account() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordMutation = useNewPassword();
  const onSubmit = (values: ProfileSchema) => {
    newPasswordMutation.mutate({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <div className="flex items-center justify-center px-5 md:px-15 mt-5 bg-[#F3F3F3] rounded-[10px] pt-5 pb-20">
      <div className="w-full max-w-md mx-auto">
        <p className="text-base lg:text-xl font-bold text-grey-90 mb-7">
          Change Your Password
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Old Password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm lg:text-base font-bold">
                      Enter Your Old Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="rounded-[10px] w-full py-5 text-sm !bg-white border-none"
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Old Password"
                          {...field}
                        />
                        <div
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                        >
                          {showOldPassword ? (
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
              {/* Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm lg:text-base font-bold">
                      Enter Your New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="rounded-[10px] w-full py-5 text-sm !bg-white border-none"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          {...field}
                        />
                        <div
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                        >
                          {showNewPassword ? (
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
                    <FormLabel className="text-sm lg:text-base font-bold">
                      Enter Password Again
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="rounded-[10px] w-full py-5 text-sm !bg-white border-none"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...field}
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

              {/* Button */}

              <Button
                type="submit"
                className="w-full py-5 font-bold"
                disabled={newPasswordMutation.isPending}
              >
                {newPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
