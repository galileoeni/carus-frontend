import { CustomError } from "@/tanstack-query";
import { AlertCircle, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export const ErrorAlert = ({ error }: { error: CustomError }) => {
  return (
    <p className="text-sm text-red-500 flex gap-1 items-center">
      <AlertCircle size={14} />
      {error?.response?.data?.message || "Something went wrong"}
    </p>
  );
};

// Generic ErrorComponent
export type ErrorComponentProps<TData = unknown> = {
  error: CustomError;
  canGoBack?: boolean;
  refetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TData, CustomError>>;
};

export function ErrorComponent<TData = unknown>({
  error,
  refetch,
  canGoBack = false,
}: ErrorComponentProps<TData>) {
  const router = useRouter();
  return (
    <>
      <div className="text-red-500 mb-4">
        <TriangleAlert size={64} />
      </div>
      <p className="text-sm text-gray-500 flex gap-1 items-center">
        {error?.response?.data?.message || "Something went wrong"}
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {refetch && (
          <Button onClick={() => refetch()} className="px-6">
            Try Again
          </Button>
        )}
        {canGoBack && (
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="px-6"
          >
            Go Back
          </Button>
        )}
      </div>
    </>
  );
}
