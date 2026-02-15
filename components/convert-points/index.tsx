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
import { Button } from "../ui/button";
import Image from "next/image";
import { usePointToNaira } from "@/queries/configuration";
import { useWallet } from "@/queries/wallet";
import { toast } from "sonner";

const convertPointsSchema = z.object({
  amount: z.string({ message: "Enter a valid amount" }),
  email: z.email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^\d{11}$/, { message: "Phone Number must be at most 11 digits" }),
});
type ConvertPointsSchema = z.infer<typeof convertPointsSchema>;

type ConvertPointsProps = {
  onBack: () => void;
};
export default function ConvertPoints({ onBack }: ConvertPointsProps) {
  const form = useForm<ConvertPointsSchema>({
    resolver: zodResolver(convertPointsSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      email: "",
      phone: "",
    },
  });
  const [isPending] = useState(false);
  const { data: pointRate, isLoading: rateLoading } = usePointToNaira();
  const { data: wallet, isLoading: walletLoading } = useWallet();

  const conversionRate = pointRate?.data;
  const userPoints = Number(wallet?.data?.points ?? 0);

  const amount = Number(form.watch("amount") || 0);
  const pointsPerNaira = Number(conversionRate?.value ?? 1);
  const calculatedPoints = amount * pointsPerNaira;

  const onSubmit = async (values: ConvertPointsSchema) => {
    console.log("Conversion attempted:", {
      amount: calculatedPoints,
      email: values.email,
      phone: values.phone,
    });

    toast("Conversion feature not ready yet.");
    form.reset();
    onBack();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      <div className="relative bg-white shadow-md rounded-[20px] w-[90%] md:max-w-md p-5 md:p-8 lg:p-10">
        <p className="text-base lg:text-xl text-grey-90 font-bold mt-3">
          Convert Points
        </p>

        {/*Close Button */}
        <button
          onClick={onBack}
          className="absolute top-3 right-3 text-[#FF6161] bg-white text-2xl cursor-pointer hover:bg-[#FF6161] hover:text-white rounded-full flex items-center justify-center transition w-8 h-8"
        >
          &times;
        </button>

        <div className="bg-gradient-to-r from-[rgba(255,237,193,0.3)] to-[rgba(171,205,188,1)] w-full rounded-[22px] px-6 py-4 overflow-hidden mt-5">
          <div className="flex justify-between items-end">
            <p className="text-primary-80 text-[11px]">
              {rateLoading
                ? "Loading rate..."
                : `${pointsPerNaira} Points = ₦1`}
            </p>

            <div className="flex flex-col items-end justify-between">
              <span className="text-[11px] lg:text-sm text-primary-80">
                Points
              </span>
              <span className="text-xl lg:text-[28px] text-primary-80 font-black leading-snug">
                {walletLoading ? "..." : userPoints}
              </span>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-5"
          >
            {/*Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-grey-90 flex items-center justify-between">
                    Amount{" "}
                    <span className="text-[9px]">
                      {conversionRate
                        ? `${pointsPerNaira} Points = ₦1`
                        : "Loading rate..."}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                      placeholder="N0.00"
                      {...field}
                    />
                  </FormControl>
                  {calculatedPoints > 0 && (
                    <p className="text-xs text-gray-500">
                      This will deduct{" "}
                      <b>{calculatedPoints.toLocaleString()}</b> points from
                      your wallet
                    </p>
                  )}
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
                  <FormLabel className="text-sm text-grey-90">Email</FormLabel>
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

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-grey-90">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                      placeholder="0812 345 6789"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={
                calculatedPoints <= 0 ||
                calculatedPoints > userPoints ||
                rateLoading ||
                walletLoading ||
                isPending
              }
              className={`py-6 w-full text-sm text-white rounded-[10px] flex items-center justify-center gap-2 mt-7 ${
                calculatedPoints <= 0 ||
                calculatedPoints > userPoints ||
                rateLoading ||
                walletLoading ||
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[rgb(2,105,55)]"
              }`}
            >
              <Image
                src="/convertshape-2.svg"
                alt=""
                width={16}
                height={16}
                className="object-contain w-4 h-4 lg:w-5 lg:h-5"
              />
              Convert Points
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
