"use client";

import {
  useContributeToCampaign,
  useDonationCampaign,
} from "@/queries/donation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LoadingComponent } from "@/components/loading";
import { useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@/queries/wallet";

export default function DonatePage() {
  const DONATION_PRESETS = [1000, 2000, 3000, 4000, 5000, 10000];

  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const campaignId = id as string;

  const { data, isLoading, isError } = useDonationCampaign(campaignId);
  const {
    data: wallet,
    isPending: loadingWallet,
    isError: walletError,
    refetch: refetchWallet,
  } = useWallet();
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const contributeMutation = useContributeToCampaign();
  const campaign = data?.data;

  const handleDonate = () => {
    if (!campaign) return;

    // Check if wallet is loading
    if (loadingWallet) {
      toast.loading("Loading wallet balance...");
      return;
    }

    // Check if wallet has error
    if (walletError) {
      toast.error("Failed to load wallet balance", {
        action: {
          label: "Retry",
          onClick: () => refetchWallet(),
        },
      });
      return;
    }

    const amount = selected || parseFloat(customAmount);

    if (!amount || amount <= 0) {
      toast.info("Please enter a valid amount greater than 0");
      return;
    }

    if (amount > Number(wallet?.data?.points ?? 0)) {
      toast.info("Insufficient point balance. Please enter a lower amount.");
      return;
    }

    contributeMutation.mutate(
      { campaignId: campaign.id, amount },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["donation-campaign", campaignId],
          });
          queryClient.invalidateQueries({ queryKey: ["donation-campaigns"] });
          setSelected(null);
          setCustomAmount("");
        },
      },
    );
  };

  const raised = Number(campaign?.amountRaised ?? 0);
  const target = Number(campaign?.target ?? 0);
  const donors = Number(campaign?.numberOfDonors ?? 0);
  const progress = target > 0 ? (raised / target) * 100 : 0;

  return (
    <div>
      {/* Header */}
      <div className="fixed top-0 z-40 bg-white flex justify-between items-center px-2 md:pr-12 h-16 md:h-20 pt-12 md:pt-18 pb-10 w-full md:w-[calc(100%-16rem)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="cursor-pointer bg-[#F3F3F3] rounded-[10px] text-[#292D32] p-2 hover:scale-90 active:scale-100 transiton duration-200"
          >
            <ArrowLeft />
          </button>
          <p className="text-xl md:text-3xl font-black">Donate</p>
        </div>
      </div>

      <div className="w-full lg:max-w-5xl mt-22 lg:mt-30 lg:px-3 border rounded-[10px] lg:rounded-[20px] p-2 lg:p-8">
        {isLoading ? (
          <div className="col-span-full mt-25 flex flex-col justify-center items-center p-2 space-y-3 h-[250px] text-center py-10">
            <LoadingComponent description="Loading campaign..." />
          </div>
        ) : isError || !campaign ? (
          <div className="flex min-h-[250px] justify-center items-center text-red-500 text-center rounded-[10px] border border-grey-10 p-4">
            Failed to load campaign. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="rounded-[10px] xl:rounded-[18px]">
                {campaign.image && (
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    width={340}
                    height={200}
                    className="object-cover rounded-[9px] w-full max-h-[200px]"
                  />
                )}

                <div className="space-y-2 mt-2">
                  <p className="text-sm lg:text-base xl:text-xl font-bold">
                    {campaign.title}
                  </p>

                  <div className="flex justify-between">
                    <p className="text-[9px] lg:text-[11px] text-grey-40">
                      Raised
                      <br />
                      <span className="text-[11px] lg:text-sm text-grey-100 font-bold">
                        ₦{raised.toLocaleString()}
                      </span>
                    </p>

                    <p className="text-[9px] lg:text-[11px] text-grey-40">
                      Target
                      <br />
                      <span className="text-[11px] lg:text-sm text-grey-100 font-bold">
                        ₦{target.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="w-full h-[4px] bg-primary-10 rounded-[20px] mt-3">
                    <div
                      className="h-full bg-[rgb(86,155,122)] rounded-[20px]"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-8 mt-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/profile-2user.svg"
                        alt="donors"
                        width={14}
                        height={14}
                      />
                      <p className="text-[9px] lg:text-[11px] text-grey-90">
                        {donors} {donors === 1 ? "Donor" : "Donors"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] md:text-sm text-justify mt-6">
                {campaign.description}
              </p>
            </div>

            {/* Right Column */}
            <div>
              <p className="text-sm md:text-base mt-5 lg:mt-0">Select Point</p>

              <div className="grid grid-cols-3 gap-3 lg:gap-y-8 mt-3 mb-10">
                {DONATION_PRESETS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelected(amount);
                      setCustomAmount("");
                    }}
                    className={`rounded-[10px] w-full py-5 border ${
                      selected === amount
                        ? "border-primary-50 text-primary-60 font-bold"
                        : "border-grey-10 text-grey-40"
                    }`}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <label className="text-sm md:text-base block">
                Enter Point
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || parseFloat(value) >= 0) {
                      setCustomAmount(value);
                      setSelected(null);
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value && parseFloat(e.target.value) <= 0) {
                      toast.info("Please enter a positive value");
                      setCustomAmount("");
                    }
                  }}
                  placeholder="Enter point manually"
                  className="rounded-[10px] w-full p-3 bg-[rgb(243,243,243)] mt-2"
                />
              </label>

              <Button
                onClick={handleDonate}
                disabled={
                  contributeMutation.isPending ||
                  (!selected && !customAmount) ||
                  progress >= 100
                }
                className={`cursor-pointer rounded-[10px] w-full h-10 flex items-center justify-center mt-8 ${
                  progress >= 100
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary"
                }`}
              >
                <Image src="/gift2.png" alt="gift" width={16} height={16} />
                <span className="text-white text-sm">
                  {progress >= 100
                    ? "Campaign Fully Funded"
                    : contributeMutation.isPending
                      ? "Processing..."
                      : "Donate Now"}
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
