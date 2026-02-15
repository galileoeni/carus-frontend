import { formatDate } from "date-fns";

import { useGetTransaction } from "@/queries/transactions";
import { formatToLocaleNaira } from "@/lib/helpers";

import { Empty } from "../empty";
import { ErrorComponent } from "../error-component";
import { LoadingComponent } from "../loading";
import StatusBadge from "./status-badge";

export default function History() {
  const { data, isPending, isError, error, refetch } = useGetTransaction();
  const historyData = data?.data;

  return (
    <div className="mt-7">
      <p className="text-base md:text-xl font-bold mb-3">History</p>

      {isPending ? (
        <div className="flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[30vh] sm:h-[40vh] md:h-[50vh] xl:h-[70vh] xl:max-h-[70vh] xl:overflow-y-auto">
          <LoadingComponent description="Loading Transaction History..." />
        </div>
      ) : isError ? (
        <div className="flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[30vh] sm:h-[40vh] md:h-[50vh] xl:h-[70vh] xl:max-h-[70vh] xl:overflow-y-auto">
          <ErrorComponent error={error} refetch={refetch} />
        </div>
      ) : historyData && historyData.length === 0 ? (
        <div className="flex flex-col justify-center items-center border border-grey-10 rounded-[10px] p-2 space-y-3 h-[30vh] sm:h-[40vh] md:h-[50vh] xl:h-[70vh] xl:max-h-[70vh] xl:overflow-y-auto">
          <Empty
            type="bill"
            description="You have no transaction history at the moment."
          />
        </div>
      ) : (
        <div className="border border-grey-10 rounded-[10px] p-2 space-y-3 flex-1 xl:max-h-[80vh] xl:overflow-y-auto">
          {historyData?.map(
            ({ description, date, amount, status, direction }, index) => (
              <div
                key={index}
                className={`border-b border-grey-20 pb-2 last:border-0 flex flex-col`}
              >
                <div className="flex justify-between gap-3">
                  <p className="text-sm md:text-base font-semibold">
                    {description}
                  </p>
                  <p
                    className={`text-sm md:text-base font-bold ${direction === "debit" ? "text-red-500" : "text-[rgb(0,177,91)]"}`}
                  >
                    ₦{formatToLocaleNaira(amount)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-grey-50 text-[9px] md:text-[13px] leading-loose">
                    {formatDate(new Date(date), "MMM d, yyyy")} at{" "}
                    {formatDate(new Date(date), "hh:mm a")}
                  </p>
                  <StatusBadge status={status} />
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
