"use client";

import { ArrowLeft, Search } from "lucide-react";
import NotificationBell from "@/components/notification-bell";
import ImageContainer from "@/components/image-container";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DropOffForm } from "@/components/drop-off-form";

const DropOffCentres = [
  {
    centre: "CarusRecycling Collection Centre",
    address: "Kogberegbe street, off Ikotun-egbe road, Ikotun, Lagos",
    time: "9:00am - 5:00pm",
  },
];

export default function Page() {
  const [activeCentre, setActiveCentre] = useState<number | null>(null);
  const [centerAddress, setCenterAddress] = useState("");
  const [dropoffForm, setDropoffForm] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCentres = DropOffCentres.filter(
    (centre) =>
      centre.centre.toLowerCase().includes(search.toLowerCase()) ||
      centre.address.toLowerCase().includes(search.toLowerCase()),
  );

  if (dropoffForm !== null) {
    return (
      <DropOffForm
        address={centerAddress}
        onBack={() => setDropoffForm(null)}
      />
    );
  }

  return (
    <>
      <div className="fixed top-0 z-40 bg-white flex justify-between items-center px-2 md:pr-12 h-16 md:h-20 pt-12 md:pt-18 pb-10 w-full md:w-[calc(100%-16rem)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="bg-[#F3F3F3] rounded-[10px] text-[#292D32] p-2"
          >
            <ArrowLeft />
          </button>
          <p className="text-xl md:text-3xl font-black">Schedule Drop-off</p>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <NotificationBell />
          <ImageContainer />
        </div>
      </div>

      <div className="px-2">
        <p className="text-sm md:text-base text-grey-90 mb-3 mt-20 md:mt-30">
          Below are the available Drop off locations closest to you.
        </p>

        {/* Search Bar */}
        <div className="relative mb-8 md:mb-10 md:w-2/3 lg:w-3/5 xl:w-1/2 ">
          <Search className="absolute text-[#292D32] top-3 md:top-4 left-3" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F3F3F3] py-3 md:py-4 rounded-[10px] border-none pl-15"
          ></input>
        </div>

        <div className="xl:flex items-center gap-8">
          <div className="xl:w-1/2  md:w-2/3 lg:w-3/5 ">
            {filteredCentres.length > 0 ? (
              filteredCentres.map(({ centre, address, time }, index) => (
                <div key={index}>
                  <div
                    onClick={() => {
                      setActiveCentre(index);
                      setCenterAddress(address);
                      setDropoffForm(index);
                    }}
                    className={`mb-5 px-6 py-3 md:px-5 lg:px-7 rounded-[10px] cursor-pointer md:space-y-1
               ${activeCentre === index ? "bg-[#E4F4EC]" : "bg-[#F3F3F3]"}   `}
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-base md:text-xl font-bold ${activeCentre === index ? "text-primary-70" : "text-[#121212]"}`}
                      >
                        {centre}
                      </h3>
                      <div className="relative bg-primary-10 rounded-full w-6 h-6 p-2">
                        <Image
                          src="/message.png"
                          alt="message"
                          fill
                          className="object-contain "
                        />
                      </div>
                    </div>
                    <p
                      className={`text-[10px] md:text-sm text-grey-40 mb-2 md:mb-4 ${activeCentre === index ? "text-primary-60" : "text-[#121212]"}`}
                    >
                      {address}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="relative bg-primary-10 rounded-full w-5 h-5 p-1">
                        <Image
                          src="/clock.png"
                          alt="clock"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <p
                        className={`text-[10px] md:text-sm text-grey-40 ${activeCentre === index ? "text-primary-60" : "text-[#121212]"}`}
                      >
                        {time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No centres found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
