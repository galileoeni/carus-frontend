"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useDonationCampaigns } from "@/queries/donation";
import { Donation } from "@/types/donation";
import { LoadingComponent } from "@/components/loading";
import { Empty } from "@/components/empty";
import { useWallet } from "@/queries/wallet";
import { formatToLocaleNaira } from "@/lib/helpers";
import { ErrorComponent } from "@/components/error-component";
import ConvertPoints from "@/components/convert-points";
import History from "@/components/transaction-history";
import RedeemPoints from "@/components/redeem-points";
import WalletHeader from "@/components/wallet-header";

export default function Wallet() {
  const [showConvertPoints, setShowConvertPoints] = useState(false);
  const [showRedeemPoints, setShowRedeemPoints] = useState(false);

  const {
    data: wallet,
    isPending: loadingWallet,
    isError: walletIsError,
    error: walletError,
    refetch: refetchWallet,
  } = useWallet();
  const {
    data,
    isPending,
    error: campaignError,
    isError,
    refetch: refetchCampaigns,
  } = useDonationCampaigns();
  const campaigns: Donation[] = data?.data || [];
  const topCampaigns = campaigns.slice(0, 3);

  return (
    <div>
      <WalletHeader
        isLoading={loadingWallet}
        isError={walletIsError}
        error={walletError}
        points={wallet?.data?.points ?? 0}
        nairaAmount={wallet?.data?.naira_amount ?? 0}
        onRedeemClick={() => setShowRedeemPoints(true)}
        refetch={refetchWallet}
      />

      <div className="xl:flex gap-12">
        <div className="xl:w-3/7">
          <div className="bg-[rgb(251,247,231)] rounded-[30px] w-full min-h-[123px] lg:min-h-[165px] p-5 lg:p-8 mt-8">
            <p className="text-base lg:text-[28px] font-bold lg:font-black">
              Convert Points to Giftcard
            </p>
            <p className="text-[9px] lg:text-sm">
              Powered by{" "}
              <span className="text-sm lg:text-base font-bold">Bitgifty</span>
            </p>
            <div className="flex items-end justify-end">
              <Button
                onClick={() => {
                  toast.info("This is a coming soon feature...");
                  return;
                  setShowConvertPoints(true);
                }}
                className="py-5 lg:py-3 w-[193px] lg:w-[180px] text-sm text-white bg-[rgb(2,105,55)] rounded-[10px] cursor-pointer flex items-center justify-center gap-2 mt-1 lg:mt-3"
              >
                <Image
                  src="/convertshape-2.svg"
                  alt="convert vector"
                  width={16}
                  height={16}
                  className="object-contain w-4 h-4 lg:w-5 lg:h-5"
                />
                Convert Points
              </Button>
            </div>
          </div>
          <div className="hidden xl:block sticky mt-10">
            <History />
          </div>
        </div>

        <div className="mt-7 md:mt-10 xl:mt-8 xl:w-4/7">
          <div className="flex items-center justify-between mb-3">
            <p className="text-grey-90 text-base lg:text-xl font-bold">
              Donate
            </p>
            <Link
              href="/wallet/donate"
              className="text-primary-60 text-sm xl:text-base"
            >
              See All
            </Link>
          </div>

          {(isError || isPending || topCampaigns.length === 0) && (
            <div className="flex flex-col items-center justify-center border border-grey-10 rounded-[10px] p-2 h-[250px] space-y-3 xl:overflow-y-auto w-full">
              {isError && (
                <ErrorComponent
                  error={campaignError}
                  refetch={refetchCampaigns}
                />
              )}

              {isPending && (
                <LoadingComponent description="Loading campaigns..." />
              )}

              {!isPending && !isError && topCampaigns.length === 0 && (
                <Empty description="No donation campaigns available at the moment." />
              )}
            </div>
          )}

          {!isPending && !isError && topCampaigns.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-5">
              {topCampaigns.map((campaign) => {
                const target = Number(campaign.target) || 0;
                const raised = Number(campaign.amountRaised) || 0;

                const progress = target > 0 ? (raised / target) * 100 : 0;

                return (
                  <div
                    key={campaign.id}
                    className="bg-[rgb(243,243,243)] rounded-[10px] xl:rounded-[18px] p-5 xl:p-6 w-full"
                  >
                    <div className="flex items-center gap-4 lg:gap-5 xl:gap-8 relative">
                      <div className="relative flex-1 aspect-video">
                        {campaign.image && (
                          <Image
                            src={campaign.image}
                            alt={campaign.title}
                            fill
                            sizes="40vw"
                            className="object-cover rounded-[10px]"
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm lg:text-base xl:text-xl font-bold lg:leading-loose">
                          {campaign.title}
                        </p>

                        <p className="text-[9px] lg:text-sm xl:text-base font-bold">
                          ₦{formatToLocaleNaira(raised)}{" "}
                          <span className="text-grey-40 font-regular">
                            Raised
                          </span>
                        </p>

                        <div className="flex items-center gap-5 mt-2 w-full">
                          <div className="w-full h-[4px] bg-primary-10 rounded-[20px]">
                            <div
                              className="h-full bg-[rgb(86,155,122)] rounded-[20px]"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <p className="text-grey-90 text-[9px] lg:text-sm float-right">
                            {Math.round(progress)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Link
                        href={`/wallet/donate/${campaign.id}`}
                        className="cursor-pointer bg-primary-60 rounded-[10px] w-[174px] xl:gap-2 h-10 flex items-center justify-center gap-2 hover:bg-primary-50"
                      >
                        <Image
                          src="/gift2.png"
                          alt="gift-icon"
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                        <span className="text-white text-[13px]">
                          Donate Earnings
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="xl:hidden mt-8">
            <History />
          </div>

          {showConvertPoints && (
            <ConvertPoints onBack={() => setShowConvertPoints(false)} />
          )}
          {showRedeemPoints && (
            <RedeemPoints onBack={() => setShowRedeemPoints(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
