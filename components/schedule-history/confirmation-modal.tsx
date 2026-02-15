import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/button";
import { TModalType } from "./single-schedule-popup";
import { Schedule } from "@/types/schedule";
import { useDeleteSchedule, useUpdateSchedule } from "@/queries/schedule";
import { ErrorAlert } from "../error-component";
import { Loader2 } from "lucide-react";

interface ConfirmationModalProps {
  scheduleId: string;
  modalType: TModalType;
  setModalType: Dispatch<SetStateAction<TModalType>>;
  setSelectedSchedule: Dispatch<SetStateAction<Schedule | null>>;
}
export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  scheduleId,
  modalType,
  setModalType,
  setSelectedSchedule,
}) => {
  const {
    mutate: deleteSchedule,
    isPending: isDeletingSchedule,
    error: errorDeletingSchedule,
  } = useDeleteSchedule();

  const {
    mutate: updateSchedule,
    isPending: isUpdatingSchedule,
    error: errorUpdatingSchedule,
  } = useUpdateSchedule();

  if (modalType === null) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        {modalType === "delete" && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-2">Delete Schedule?</h2>
            <p className="text-sm mb-4">
              Are you sure you want to delete this schedule? This action cannot
              be undone.
            </p>
            {errorDeletingSchedule && (
              <ErrorAlert error={errorDeletingSchedule} />
            )}
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setModalType(null)}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="px-4 bg-red-500 text-white"
                onClick={() => {
                  if (scheduleId) {
                    deleteSchedule(scheduleId, {
                      onSuccess: () => {
                        setModalType(null);
                        setSelectedSchedule(null);
                      },
                    });
                  }
                }}
                disabled={isDeletingSchedule}
              >
                {isDeletingSchedule ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </Button>
            </div>
          </div>
        )}
        {modalType === "missed" && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-2">Missed Schedule?</h2>
            <p className="text-sm mb-4">
              Are you sure you want to update this schedule to a missed
              schedule?
            </p>
            {errorUpdatingSchedule && (
              <ErrorAlert error={errorUpdatingSchedule} />
            )}
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setModalType(null)}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="px-4 bg-primary text-white"
                onClick={() => {
                  if (scheduleId) {
                    updateSchedule(
                      { id: scheduleId, status: "missed" },
                      {
                        onSuccess: () => {
                          setModalType(null);
                          setSelectedSchedule(null);
                        },
                      },
                    );
                  }
                }}
                disabled={isUpdatingSchedule}
              >
                {isUpdatingSchedule ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  "Yes, update"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
