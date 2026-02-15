"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRedeemAirtime, useRedeemCash } from "@/queries/redeem";
import { useWallet } from "@/queries/wallet";
import { usePointToNaira } from "@/queries/configuration";
import { useQueryClient } from "@tanstack/react-query";
import { transactionKeys, walletKeys } from "@/queries/query-keys";

import { Button } from "../ui/button";
import { formatToLocaleNaira } from "@/lib/helpers";

const networks: {
  network: "MTN" | "AIRTEL" | "GLO" | "9MOBILE";
  image: string;
}[] = [
  {
    network: "MTN",
    image: "/mtn.svg",
  },

  {
    network: "AIRTEL",
    image: "/airtel.svg",
  },

  {
    network: "GLO",
    image: "/glo.svg",
  },

  {
    network: "9MOBILE",
    image: "/9mobile.svg",
  },
];

const banks = [
  "Access Bank",
  "Citibank",
  "Ecobank",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Lotus Bank",
  "Parallex Bank",
  "Polaris Bank",
  "Premium Trust Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Suntrust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  "Kuda Microfinance Bank",
  "OPay (Paycom Microfinance Bank)",
  "PalmPay",
  "Moniepoint Microfinance Bank",
  "FairMoney Microfinance Bank",
  "VFD Microfinance Bank",
  "Rubies Bank",
  "Sparkle Microfinance Bank",
  "Eyowo Microfinance Bank",
  "Carbon (One Finance)",
];

const airtimeSchema = z.object({
  amount: z.string().min(1, "Enter a valid amount"),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
});

const cashSchema = z.object({
  amount: z.string().min(1, "Enter a valid amount"),
  accountNo: z
    .string()
    .regex(/^\d{10}$/, "Enter your 10 digits account number"),
  accountName: z.string().min(2, "Enter account name"),
  bank: z.string().nonempty("Please select a bank"),
});

type RedeemPointsProps = {
  onBack: () => void;
};
export default function RedeemPoints({ onBack }: RedeemPointsProps) {
  const queryClient = useQueryClient();
  const [option, setOption] = useState<"airtime" | "cash">("airtime");
  const [selectedNetwork, setSelectedNetwork] = useState<
    "MTN" | "AIRTEL" | "GLO" | "9MOBILE" | null
  >(null);
  const queriesInvalidation = () => {
    queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    queryClient.invalidateQueries({ queryKey: walletKeys.all });
  };

  const airtimeForm = useForm<z.infer<typeof airtimeSchema>>({
    resolver: zodResolver(airtimeSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      amount: "",
    },
  });

  const cashForm = useForm<z.infer<typeof cashSchema>>({
    resolver: zodResolver(cashSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      accountNo: "",
      accountName: "",
      bank: "",
    },
  });

  const { data: wallet } = useWallet();
  const { data: rate } = usePointToNaira();

  const conversionRate = Number(rate?.data?.value ?? 0);
  const userPoints = Number(wallet?.data?.points ?? 0);

  const airtimeAmount = Number(airtimeForm.watch("amount") || 0);
  const cashAmount = Number(cashForm.watch("amount") || 0);

  const airtimePointsToRedeem =
    conversionRate && airtimeAmount > 0
      ? Math.floor(airtimeAmount * conversionRate)
      : 0;

  const cashPointsToRedeem =
    conversionRate && cashAmount > 0
      ? Math.floor(cashAmount * conversionRate)
      : 0;

  const { mutate: redeemAirtime, isPending: airtimePending } = useRedeemAirtime(
    {
      onSuccess: () => {
        queriesInvalidation();
        onBack();
      },
    },
  );
  const { mutate: redeemCash, isPending: cashPending } = useRedeemCash({
    onSuccess: () => {
      queriesInvalidation();
      onBack();
    },
  });

  const validatePoints = (points: number) => {
    if (points > userPoints) {
      toast.info("Insufficient points");
      return false;
    }
    return true;
  };

  const handleAirtimeSubmit = (values: z.infer<typeof airtimeSchema>) => {
    if (!selectedNetwork) return toast("Please select a network");
    if (!validatePoints(airtimePointsToRedeem)) return;

    redeemAirtime({
      network: selectedNetwork.toLowerCase(),
      points: airtimePointsToRedeem,
      phoneNumber: values.phone,
    });
  };

  const handleCashSubmit = (values: z.infer<typeof cashSchema>) => {
    if (!values.bank || !values.accountNo || !values.accountName) {
      return toast.info("Please fill in all bank details");
    }
    if (!validatePoints(cashPointsToRedeem)) return;

    redeemCash({
      points: cashPointsToRedeem,
      accountNumber: values.accountNo,
      bankName: values.bank,
      accountName: values.accountName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      <div className=" lg:overflow-y-auto lg:max-h-screen w-[90%] md:max-w-md ">
        <div className="relative max-h-[80vh] overflow-y-auto bg-white shadow-md rounded-[20px] p-5 md:p-8 lg:p-10">
          <p className="text-base lg:text-xl text-grey-90 font-bold mt-3">
            Redeem Points
          </p>

          {/*Close Button */}
          <button
            onClick={onBack}
            className="absolute top-3 right-3 text-[#FF6161] bg-white text-2xl cursor-pointer hover:bg-[#FF6161] hover:text-white rounded-full flex items-center justify-center transition w-8 h-8"
          >
            &times;
          </button>

          <div className="bg-gradient-to-r from-[rgba(255,237,193,0.3)] to-[rgba(171,205,188,1)] w-full rounded-[22px] px-6 py-4 mt-3">
            <div className="flex justify-between items-end">
              <p className="text-primary-80 text-[11px]">
                {conversionRate
                  ? `${conversionRate} Points = ₦1`
                  : "Loading rate..."}
              </p>

              <div className="flex flex-col items-end justify-between">
                <span className="text-[11px] lg:text-sm text-primary-80">
                  Points
                </span>
                <span className="text-xl lg:text-[28px] text-primary-80 font-black leading-snug">
                  {formatToLocaleNaira(userPoints)}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between rounded-full bg-[#F3F3F3] p-2 mb-5 mt-5">
            <Button
              onClick={() => {
                setOption("airtime");
              }}
              className={`rounded-full py-4 px-3 lg:px-7 text-center text-sm hover:text-white ${
                option === "airtime"
                  ? "bg-[#CCE1D7] text-black"
                  : "bg-white text-black"
              }`}
            >
              {" "}
              Convert to Airtime
            </Button>

            <Button
              onClick={() => setOption("cash")}
              className={`rounded-full py-4 px-3 lg:px-7 text-center text-sm hover:text-white ${
                option === "cash"
                  ? "bg-[#CCE1D7] text-black"
                  : "bg-white text-black"
              }`}
            >
              Convert to Cash
            </Button>
          </div>

          {option === "airtime" && (
            <div>
              <p className="text-grey-90 text-sm">Choose Network</p>
              <div className="grid grid-cols-4 gap-4 mt-3">
                {networks.map(({ network, image }) => (
                  <button
                    key={network}
                    onClick={() => setSelectedNetwork(network)}
                    className={`flex flex-col items-center justify-center gap-2 text-[10px] text-grey-90 rounded-[10px] p-2 lg:p-3 ${selectedNetwork === network ? "border border-primary-30 bg-[rgb(243,243,243)]" : "bg-[rgb(243,243,243)]"}`}
                  >
                    <Image src={image} alt={network} width={24} height={24} />
                    {network}
                  </button>
                ))}
              </div>

              {/*Input Fields */}

              <Form {...airtimeForm}>
                <form
                  onSubmit={airtimeForm.handleSubmit(handleAirtimeSubmit)}
                  className="space-y-4 mt-5"
                >
                  {/*Amount */}
                  <FormField
                    control={airtimeForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-grey-90 flex items-center justify-between">
                          Amount{" "}
                          <span className="text-[9px]">
                            {conversionRate
                              ? `${conversionRate} Points = ₦1`
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
                        {airtimePointsToRedeem > 0 && (
                          <p className="text-xs text-gray-500">
                            This will deduct{" "}
                            <b>{airtimePointsToRedeem.toLocaleString()}</b>{" "}
                            points from your wallet
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number */}
                  <FormField
                    control={airtimeForm.control}
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
                    className="py-6 w-full text-sm rounded-[10px] cursor-pointer flex items-center justify-center gap-2 mt-7"
                    disabled={airtimePending}
                  >
                    {airtimePending ? (
                      <>
                        <Loader2 className="animate-spin mr-2" />
                        <span>Redeeming...</span>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/convertshape-2.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="object-contain w-4 h-4 lg:w-5 lg:h-5"
                        />
                        Redeem Points
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {option === "cash" && (
            <div>
              {/*Input Fields */}

              <Form {...cashForm}>
                <form
                  onSubmit={cashForm.handleSubmit(handleCashSubmit)}
                  className="space-y-4 mt-5"
                >
                  {/*Amount */}
                  <FormField
                    control={cashForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-grey-90 flex items-center justify-between">
                          Amount{" "}
                          <span className="text-[9px]">
                            {conversionRate
                              ? `${conversionRate} Points = ₦1`
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
                        {cashPointsToRedeem > 0 && (
                          <p className="text-xs text-gray-500">
                            This will deduct{" "}
                            <b>{cashPointsToRedeem.toLocaleString()}</b> points
                            from your wallet
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number */}
                  <FormField
                    control={cashForm.control}
                    name="accountNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-grey-90">
                          Account Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                            placeholder="0008123456"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bank */}
                  <FormField
                    control={cashForm.control}
                    name="bank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-grey-90">
                          Select Bank
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              {...field}
                              className="rounded-[10px] w-full pr-8 pl-3 py-4 text-sm bg-[#F3F3F3] border-none leading-5 appearance-none"
                            >
                              <option value="">Choose Bank</option>
                              {banks.map((bank) => (
                                <option key={bank} value={bank}>
                                  {bank}
                                </option>
                              ))}
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

                  {/* Account Name */}
                  <FormField
                    control={cashForm.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-90">
                          Account Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-[10px] w-full py-6 text-sm bg-[#F3F3F3] border-none"
                            placeholder="Lanre Adebayo"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="py-6 w-full text-sm rounded-[10px] cursor-pointer flex items-center justify-center gap-2 mt-7"
                    disabled={cashPending}
                  >
                    {cashPending ? (
                      <>
                        <Loader2 className="animate-spin mr-2" />
                        <span>Redeeming...</span>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/convertshape-2.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="object-contain w-4 h-4 lg:w-5 lg:h-5"
                        />
                        Redeem Points
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
