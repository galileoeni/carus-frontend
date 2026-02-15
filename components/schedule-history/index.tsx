"use client";
import { useState } from "react";
import Image from "next/image";
import { useGetSchedule } from "@/queries/schedule";
import { SingleSchedulePopup } from "./single-schedule-popup";
import { Schedule } from "@/types/schedule";
import { format } from "date-fns";
import { Empty } from "../empty";
import { LoadingComponent } from "../loading";
import { ErrorComponent } from "../error-component";
import { getSchedulePreposition } from "@/lib/helpers";

export default function ScheduleHistory() {
  const { data, isPending, isError, error, refetch } = useGetSchedule();

  const [activeTab, setActiveTab] = useState<
    "pending" | "completed" | "missed"
  >("pending");
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  // Filter schedules by status for the active tab
  const filteredSchedules = data?.data?.filter(
    (item) => item.status === activeTab,
  );

  const statusClassName = {
    pending:
      "capitalize text-[#E24949] text-[9px] md:text-sm px-4 py-1 md:py-2 bg-[#FFEBEB] rounded-[8px]",
    completed:
      "capitalize text-primary-50 text-[9px] md:text-sm px-4 py-1 md:py-2 bg-[#E0F3EA] rounded-[8px]",
    missed:
      "capitalize text-[#C58E00] text-[9px] md:text-sm px-4 py-1 md:py-2 bg-[#FFF8E4] rounded-[8px]",
  };

  return (
    <div>
      <p className="text-sm md:text-xl font-bold pb-4 pt-7 md:pt-10">
        Schedule History
      </p>

      <div className="border border-primary-10 p-5 rounded-[10px]">
        <div className="flex gap-20">
          {["pending", "completed", "missed"].map((tab) => (
            <div key={tab}>
              <button
                onClick={() =>
                  setActiveTab(tab as "pending" | "completed" | "missed")
                }
                className={`cursor-pointer capitalize pb-1 md:px-5 ${activeTab === tab ? "text-[#026937] text-[11px] md:text-base" : "text-[11px] md:text-base text-[#6D6D6D]"}`}
              >
                {tab}
              </button>

              {/*Active Line */}
              {activeTab === tab && (
                <div className="w-full h-[4px] bg-primary-50 rounded-[30px]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div className="w-full h-0.5 bg-[#CCE1D7] rounded-[30px] mb-5"></div>

        {isPending && (
          <div className="flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[250px] xl:overflow-y-auto">
            <LoadingComponent description="Loading Schedule History..." />
          </div>
        )}

        {isError && (
          <div className="flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[250px] xl:overflow-y-auto">
            <ErrorComponent error={error} refetch={refetch} />
          </div>
        )}

        {filteredSchedules && filteredSchedules.length === 0 && (
          <div className="flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[250px] xl:overflow-y-auto">
            <Empty description="You have no schedule history for this category at the moment." />
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5">
          {filteredSchedules &&
            filteredSchedules.length > 0 &&
            filteredSchedules.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSchedule(item)}
                className="bg-[#F5F5F5] rounded-[17px] px-6 py-4 cursor-pointer mb-5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    {" "}
                    <p className="font-bold text-[11px] md:text-xl">
                      Bags filled with {item.material}{" "}
                      {getSchedulePreposition(item.category)}
                    </p>
                    <span className={statusClassName[activeTab]}>
                      {activeTab}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <p className="text-[9px] md:text-sm leading-tight">
                      {item.address}
                    </p>
                  </div>

                  <div className="flex gap-10 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="relative bg-primary-10 rounded-full w-5 h-5 p-1">
                        <Image
                          src="/calendar.png"
                          alt="calendar"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="text-[9px] md:text-base">
                        {format(item.date, "dd-MM-yyyy")}
                      </span>
                    </div>

                    <div className="hidden items-center gap-2">
                      <div className="relative bg-primary-10 rounded-full w-5 h-5 p-1">
                        <Image
                          src="/clock.png"
                          alt="clock"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="text-[9px] md:text-base">
                        {format(item.date, "hh:mm a")}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/*Popup Modal */}
      <SingleSchedulePopup
        selectedSchedule={selectedSchedule}
        setSelectedSchedule={setSelectedSchedule}
        activeTab={activeTab}
      />
    </div>
  );
}
