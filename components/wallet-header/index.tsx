"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatToLocaleNaira } from "@/lib/helpers";
import { CustomError } from "@/tanstack-query";
import { ErrorComponent } from "../error-component";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { WalletResponse } from "@/types/wallet";

type WalletHeaderProps = {
  isLoading: boolean;
  isError: boolean;
  error: CustomError | null;
  points: number | string;
  nairaAmount: number | string;
  onRedeemClick: () => void;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<WalletResponse, CustomError>>;
};

export default function WalletHeader({
  isLoading,
  isError,
  error,
  points = 0,
  nairaAmount = 0,
  onRedeemClick,
  refetch,
}: WalletHeaderProps) {
  if (error && isError) {
    return (
      <div className="col-span-full mt-25 flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[250px] text-center py-10">
        <ErrorComponent error={error} refetch={refetch} />
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-[rgba(255,237,193,0.3)] to-[rgba(171,205,188,1)] h-[148px] lg:h-[232px] w-full rounded-[22px] lg:rounded-[30px] p-5 lg:p-8 overflow-hidden mt-22 md:mt-32">
      <div className="absolute top-0 left-0 w-[250px] md:w-[318px] h-[148px] lg:h-[232px] lg:w-[500px] xl:w-[700px]">
        <Image
          src="/Line.svg"
          alt="wave"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between h-28 lg:h-45 relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-[9px] lg:text-xl text-primary-80">
            <p>
              Points
              <br />
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-28 mt-2 bg-grey-10" />
            ) : (
              <span className="text-[11px] lg:text-2xl font-black">
                {formatToLocaleNaira(points)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={onRedeemClick}
            className="py-5 lg:py-6 w-[150px] lg:w-[180px] text-[13px] lg:text-base text-white bg-[rgb(2,105,55)] rounded-[10px] cursor-pointer flex items-center justify-center gap-2"
          >
            <Image
              src="/import.svg"
              alt="import-icon"
              width={16}
              height={16}
              className="object-contain w-4 h-4 lg:w-5 lg:h-5"
            />
            Redeem Points
          </Button>
          <div className="text-[11px] lg:text-base text-primary-80 text-right">
            <p>Naira Equivalent</p>
            {isLoading ? (
              <Skeleton className="h-10 w-36 mt-1 bg-grey-20" />
            ) : (
              <span className="text-2xl lg:text-[33px] font-black">
                ₦{formatToLocaleNaira(nairaAmount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
