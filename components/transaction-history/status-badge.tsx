import { TransactionStatusTypes } from "@/types/transaction";

const statusStyles: Record<TransactionStatusTypes, string> = {
  paid: "bg-green-100 text-green-800",
  completed: "bg-green-100 text-green-800",
  fulfilled: "bg-blue-100 text-blue-800",
  approved: "bg-emerald-100 text-emerald-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  declined: "bg-red-100 text-red-800",
};

export default function StatusBadge({
  status,
}: {
  status: TransactionStatusTypes;
}) {
  return (
    <span
      className={`h-fit mt-auto text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
