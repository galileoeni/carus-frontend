import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

type EarnRewardProps = {
  onClose: () => void;
};

export default function EarnReward({ onClose }: EarnRewardProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center mb-5 px-2 md:px-4">
      <div className="bg-white max-h-[80vh] overflow-y-auto shadow-md w-full max-w-md md:max-w-lg xl:max-w-3xl rounded-[30px] p-8 relative xl:flex xl:items-center xl:gap-8">
        <Button
          onClick={onClose}
          className="absolute top-2 right-4 text-[#FF6161] bg-white text-2xl cursor-pointer hover:bg-[#FF6161] hover:text-white rounded-full flex items-center justify-center transition w-8 h-8"
        >
          &times;
        </Button>

        <div className="flex-1 mt-5">
          <p className="text-sm md:text-base mb-8 xl:mb-10 text-justify">
            By using our app to manage and donate your waste, you can earn
            points that can be redeemed for exciting rewards such as discounts,
            points, and even cash.
          </p>

          <div className="relative w-full h-[200px]">
            <Image
              src="/picking-waste.svg"
              alt=""
              fill
              className="object-cover rounded-[14px]"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
              }}
            />
            {/* <Image
              src="/Frame.png"
              alt=""
              fill
              className="object-cover rounded-[14px]"
            /> */}
          </div>
        </div>
        <div className="flex-1 space-y-4 xl:space-y-5 mt-8 xl:mt-5">
          <p className="text-sm md:text-base md:font-bold">
            You can Earn Reward by following these simple steps
          </p>
          <p className="text-sm md:text-base">
            Log on to <span className="font-bold">carusrecycling.com</span>
          </p>
          <p className="text-sm md:text-base">
            Click on{" "}
            <Link href="schedule" className="font-bold">
              Schedule
            </Link>
          </p>
          <p className="text-sm md:text-base">
            Input the number of bottles to be picked up
          </p>
          <p className="text-sm md:text-base font-bold">
            Schedule the pick up{" "}
            <span className="font-normal">
              and get rewarded with Carus Points
            </span>
          </p>
          <p>
            Withdraw to your bank, donate to charity or buy recharge card with
            your earned points.
          </p>

          <Button
            type="button"
            className="w-full py-2 text-[14px] xl:text-base text-white bg-primary-60 rounded-[10px] cursor-pointer flex items-center justify-center gap-3"
            onClick={onClose}
          >
            <Image
              src="/wallet-money2.png"
              alt="Money icon"
              width={20}
              height={20}
              className="object-contain"
            />
            Start Earning
          </Button>
        </div>
      </div>
    </div>
  );
}
