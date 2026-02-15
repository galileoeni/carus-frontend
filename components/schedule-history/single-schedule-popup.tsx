import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Schedule } from "@/types/schedule";
import { format } from "date-fns";
import { getSchedulePreposition } from "@/lib/helpers";
import { ConfirmationModal } from "./confirmation-modal";

interface ISingleScheduleProp {
  activeTab: "pending" | "completed" | "missed";
  selectedSchedule: Schedule | null;
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>;
}

const selectedClassName = {
  pending:
    "capitalize text-[#E24949] text-[9px] px-2 py-1  bg-[#FFEBEB] rounded-[8px]",
  completed:
    "capitalize text-primary-50 text-[9px] px-2 py-1 bg-[#E0F3EA] rounded-[8px]",
  missed:
    "capitalize text-[#C58E00] text-[9px] px-2 py-1 bg-[#FFF8E4] rounded-[8px]",
};

export type TModalType = "delete" | "missed" | null;

export const SingleSchedulePopup: FC<ISingleScheduleProp> = ({
  selectedSchedule,
  setSelectedSchedule,
  activeTab,
}) => {
  const [showInnerModal, setShowInnerModal] = useState<TModalType>(null);

  useEffect(() => {
    setShowInnerModal(null);
  }, [selectedSchedule]);

  if (!selectedSchedule) return null;
  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex justify-center items-center">
      <div
        className="bg-white shadow-md rounded-[20px] p-6 w-[90%] md:w-[450px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-5 pt-5">
          <p className="text-xl xl:tex-2xl font-bold"> Schedule History</p>

          <Button
            onClick={() => setSelectedSchedule(null)}
            className="absolute top-2 right-3 text-[#FF6161] bg-white text-2xl cursor-pointer hover:bg-[#FF6161] hover:text-white rounded-full flex items-center justify-center transition w-8 h-8"
          >
            &times;
          </Button>

          <div className="bg-[#E4F4EC] p-2 rounded-[10px] mt-5">
            <div className="flex items-center justify-between">
              {" "}
              <p className="font-bold text-[11px] md:text-[13px]">
                Containers filled with {selectedSchedule.material}{" "}
                {getSchedulePreposition(selectedSchedule.category)}
              </p>
              <span className={selectedClassName[activeTab]}>{activeTab}</span>
            </div>
            <div>
              <p className="text-[9px] leading-tight">
                {selectedSchedule.address}
              </p>
            </div>

            <div className="flex gap-5 mt-4">
              <div className="flex items-center gap-2">
                <div className="relative bg-primary-10 rounded-full w-5 h-5 p-1">
                  <Image
                    src="/calendar.png"
                    alt="calendar"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-[9px]">
                  {format(selectedSchedule.schedule_date, "dd-MM-yyyy")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative bg-primary-10 rounded-full w-5 h-5 p-1">
                  <Image
                    src="/clock.png"
                    alt="clock"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-[9px]">
                  {format(selectedSchedule.schedule_date, "hh:mm a")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-5">
            {/*Category */}
            <p className="text-[9px] md:text-sm">Category</p>
            <div className="bg-[#FFF7D4] w-[90px] flex gap-2 rounded-3xl items-center py-2 px-2 transition-all duration-200 ">
              <div className="relative w-6 h-6 rounded-full flex items-center justify-center overflow-hidden bg-[#FFE168]">
                <Image
                  src="/plastic.svg"
                  alt="plastic"
                  fill
                  object-contain
                  p-1
                />
              </div>
              <p className="text-[9px] md:text-sm">Plastic</p>
            </div>

            {/*No of Plastic Waste*/}
            <p className="text-[9px] md:text-sm mt-4">
              Number of Plastic Waste
            </p>
            <div className="bg-[#F3F3F3] rounded-[10px] p-2">
              <p className="text-[9px] md:text-sm ">500</p>
            </div>

            {/*No of Plastic Bag*/}
            <p className="text-[9px] md:text-sm mt-4">Number of Plastic Bag</p>
            <div className="bg-[#F3F3F3] rounded-[10px] p-2">
              <p className="text-[9px] md:text-sm ">20</p>
            </div>
          </div>
          {activeTab !== "completed" && (
            <div className="flex gap-4 sm:gap-10 mt-10">
              <Button
                type="button"
                className="flex-1 py-2 text-[9px] md:text-sm font-bold text-green-60 bg-white border border-primary-60 rounded-[10px] cursor-pointer"
                onClick={() => setShowInnerModal("delete")}
              >
                Delete
              </Button>
              {activeTab !== "missed" && (
                <Button
                  type="button"
                  className="flex-1 py-2 text-[9px] text-white md:text-sm font-bold bg-primary-60 rounded-[10px] cursor-pointer"
                  onClick={() => setShowInnerModal("missed")}
                >
                  Missed
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        scheduleId={selectedSchedule.id}
        modalType={showInnerModal}
        setModalType={setShowInnerModal}
        setSelectedSchedule={setSelectedSchedule}
      />
    </div>
  );
};
