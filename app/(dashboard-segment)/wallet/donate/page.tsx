"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useDonationCampaigns } from "@/queries/donation";
import { useRouter } from "next/navigation";
import { LoadingComponent } from "@/components/loading";
import { Empty } from "@/components/empty";
import Link from "next/link";
import { formatToLocaleNaira } from "@/lib/helpers";

export default function Donate() {
  const router = useRouter();
  const { data, isLoading, error } = useDonationCampaigns();
  const campaigns = data?.data || [];

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">
            Failed to load campaigns. Please try again later.
          </p>
        </div>
      </div>
    );
  }

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

      {/* Campaign List */}
      <div className="pt-26 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {isLoading ? (
          <div className="col-span-full mt-25 flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[250px] text-center py-10">
            <LoadingComponent description="Loading campaigns..." />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <div className="flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[250px]">
              <Empty description="No donation campaigns available at the moment." />
            </div>
          </div>
        ) : (
          campaigns.map((campaign) => {
            const target = Number(campaign.target) || 0;
            const raised = Number(campaign.amountRaised) || 0;
            const progress = target > 0 ? (raised / target) * 100 : 0;

            return (
              <div
                key={campaign.id}
                className="bg-[rgb(243,243,243)] rounded-[10px] xl:rounded-[18px] px-4 py-3 xl:p-6 mb-1 lg:mb-4"
              >
                <div className="flex items-center gap-4 lg:gap-5 xl:gap-6">
                  {campaign.image && (
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      width={96}
                      height={96}
                      className="object-cover rounded-[10px] xl:w-[152px] xl:h-[152px]"
                    />
                  )}

                  <div className="flex-1 lg:mt-5 xl:mt-3">
                    <p className="text-sm lg:text-base xl:text-xl font-bold">
                      {campaign.title}
                    </p>

                    <p className="text-[9px] lg:text-sm xl:text-base font-bold">
                      ₦{formatToLocaleNaira(raised)}{" "}
                      <span className="text-grey-40 font-regular">Raised</span>
                    </p>

                    {campaign.days_left && (
                      <div className="flex items-center gap-1 xl:gap-4 mt-2 xl:mt-5">
                        <div className="bg-[rgba(232,232,232)] w-4 h-4 lg:w-6 lg:h-6 rounded-full flex items-center justify-center">
                          <Image
                            src="/clock.png"
                            alt="clock-icon"
                            width={10}
                            height={10}
                            className="object-contain lg:w-3 lg:h-3"
                          />
                        </div>
                        <p className="text-[9px] lg:text-[11px] xl:text-sm">
                          {campaign.days_left} Days left
                        </p>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="flex items-center gap-5 mt-2 lg:mb-4 w-full">
                      <div className="w-full h-[4px] bg-primary-10 rounded-[20px]">
                        <div
                          className="h-full bg-[rgb(86,155,122)] rounded-[20px]"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <p className="text-grey-90 text-[9px] lg:text-sm">
                        {Math.round(progress)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <div className="flex justify-end lg:pb-2">
                  <Link
                    href={`/wallet/donate/${campaign.id}`}
                    className="cursor-pointer bg-primary-60 hover:bg-primary-50 rounded-[10px] w-[40px] xl:w-[174px] xl:gap-2 h-10 flex items-center justify-center"
                  >
                    <Image
                      src="/gift2.png"
                      alt="gift-icon"
                      width={16}
                      height={16}
                      className="object-contain"
                    />

                    <span className="hidden xl:block text-white text-sm">
                      Donate Earnings
                    </span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
