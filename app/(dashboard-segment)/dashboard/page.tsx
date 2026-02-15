"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import EarnReward from "@/components/earn-reward";
import History from "@/components/transaction-history";
import RedeemPoints from "@/components/redeem-points";

export default function Page() {
  const [earnReward, setEarnReward] = useState(false);
  const [showRedeemPoints, setShowRedeemPoints] = useState(false);

  return (
    <div>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="xl:w-2/3 ">
          <Link href="/schedule/pickup">
            <div className="relative bg-gradient-to-r from-[rgba(255,237,193,0.3)] to-[rgba(171,205,188,1)] h-[150px] lg:h-[248px] w-full rounded-[20px] overflow-hidden mt-22 md:mt-35">
              <div className="flex flex-col justify-end h-full pb-5 md:pb-10 lg:pb-20 xl:pb-15 space-y-1 px-5 md:px-10">
                <p className="text-primary-70 text-sm md:text-base lg:text-2xl font-bold z-10">
                  Request Pickup
                </p>
                <p className="text-primary-60 text-[12px] md:text-sm leading-snug z-10">
                  Request your waste
                  <br className="lg:hidden" /> pickup at your doorstep
                </p>
              </div>

              <Image
                src="/truck.svg"
                alt="Waste Bin"
                width={180}
                height={150}
                className="absolute top-0 right-0 md:w-[200px] md:h-[170px] lg:w-[295px] lg:h-[248px] object-contain"
              />
            </div>
          </Link>

          <div className="mt-7">
            <p className="text-sm md:text-xl font-bold">Quick Action</p>
            <div className="grid grid-cols-4 gap-2 lg:gap-6 mt-3">
              <Link href="/schedule/dropoff">
                <div className="flex flex-col items-center justify-center space-y-1 lg:space-y-2 bg-primary-10 rounded-[10px] p-1 md:p-3 w-full h-[64px] md:h-[80px] lg:h-[112px]">
                  <Image
                    src="/truck-remove.png"
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain w-[20px] h-[20px] lg:h-[40px] lg:w-[40px]"
                  />
                  <p className="text-[9px] md:text-[11px] lg:text-base text-grey-90">
                    Recycle waste
                  </p>
                </div>
              </Link>

              <div
                onClick={() => setEarnReward(true)}
                className="cursor-pointer flex flex-col items-center justify-center space-y-1 lg:space-y-2 bg-primary-10 rounded-[10px] p-1 md:p-3 w-full h-[64px] md:h-[80px] lg:h-[112px]"
              >
                <Image
                  src="/wallet-money.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain w-[20px] h-[20px] lg:h-[40px] lg:w-[40px]"
                />
                <p className="text-[9px] md:text-[11px] lg:text-base text-grey-90">
                  Earn Reward
                </p>
              </div>

              <div
                onClick={() => setShowRedeemPoints(true)}
                className="cursor-pointer flex flex-col items-center justify-center space-y-1 lg:space-y-2 bg-primary-10 rounded-[10px] p-1 md:p-3 w-full h-[64px] md:h-[80px] lg:h-[112px]"
              >
                <Image
                  src="/import.png"
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain w-[20px] h-[20px] lg:h-[40px] lg:w-[40px]"
                />
                <p className="text-[9px] md:text-[11px] lg:text-base text-grey-90 text-center">
                  Redeem Earning
                </p>
              </div>

              <Link href="/wallet/donate">
                <div className="flex flex-col items-center justify-center space-y-1 lg:space-y-2 bg-primary-10 rounded-[10px] p-1 md:p-3 w-full h-[64px] md:h-[80px] lg:h-[112px]">
                  <Image
                    src="/gift.png"
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain w-[20px] h-[20px] lg:h-[40px] lg:w-[40px]"
                  />
                  <p className="text-[9px] md:text-[11px] lg:text-base text-grey-90">
                    Donate
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm md:text-xl font-bold">Tips and Resources</p>
            <Link
              href={
                "https://chat.whatsapp.com/LtZQhfRGaRG2Fe3ZJ2USOY?mode=gi_c"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative bg-gradient-to-r from-[rgba(255,237,193,0.3)] to-[rgba(171,205,188,1)] h-[118px] lg:h-[195px] w-full rounded-[12px] overflow-hidden mt-3 px-8 pt-5">
                <Image
                  src="/Community.png"
                  alt="Waste Bin"
                  width={500}
                  height={300}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-h-full object-contain"
                />
                <p className="text-[10px] md:text-sm lg:text-base text-primary-60 font-bold leading-snug">
                  Join Our
                  <br /> community
                </p>
              </div>
            </Link>
          </div>
        </div>

        <aside className="xl:w-1/3 xl:mt-25 sticky top-0">
          <History />
        </aside>
      </div>

      {earnReward && <EarnReward onClose={() => setEarnReward(false)} />}
      {showRedeemPoints && (
        <RedeemPoints onBack={() => setShowRedeemPoints(false)} />
      )}
    </div>
  );
}
