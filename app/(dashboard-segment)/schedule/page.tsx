"use client";

import Image from "next/image";
import Link from "next/link";
import ScheduleHistory from "@/components/schedule-history";
// import { useQuery } from "@tanstack/react-query";

export default function Page() {
  // const { data, isPending, isError, error } = useQuery(useGetScheduleByIdQueryOptions());

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mt-20 md:mt-30">
        <Link
          href="/schedule/pickup"
          className="bg-[#F3F3F3] rounded-[10px] md:space-y-3 xl:space-y-2 px-6 py-2 md:p-4 cursor-pointer"
        >
          <div className="flex justify-end ml-auto pt-2">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-primary-10 rounded-full">
              <Image
                src="/truck-time.png"
                alt="schedule-image"
                fill
                className="object-contain p-3 md:p-4"
              />
            </div>
          </div>
          <div className="py-4 lg:pl-8 lg:pr-10 lg:py-2 xl:pl-6 xl:pr-30  space-y-2">
            <h3 className="text-[15px] md:text-[18px] lg:text-xl xl:text-2xl font-bold">
              Schedule Pickup
            </h3>
            <p className="text-[12px] text-grey-40 md:text-sm lg:text-base font-bold">
              Request for waste pickup at your convenience
            </p>
          </div>
        </Link>

        {/*Drop-off */}

        <Link
          href="/schedule/dropoff"
          className="bg-[#F3F3F3] rounded-[10px] md:space-y-3 xl:space-y-2 px-6 py-2 md:p-4 cursor-pointer"
        >
          <div className="flex justify-end ml-auto pt-2">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-primary-10 rounded-full">
              <Image
                src="/location.png"
                alt="schedule-image"
                fill
                className="object-contain p-3 md:p-4"
              />
            </div>
          </div>
          <div className="py-4 lg:pl-8 lg:pr-10 lg:py-2 xl:pl-6 xl:pr-30  space-y-2">
            <h3 className="text-[15px] md:text-[18px] lg:text-xl xl:text-2xl font-bold">
              Schedule Drop-off
            </h3>
            <p className="text-[12px] text-grey-40 md:text-sm lg:text-base font-bold">
              Request for waste drop-off at your covenience
            </p>
          </div>
        </Link>
      </div>

      <ScheduleHistory />
    </div>
  );
}
