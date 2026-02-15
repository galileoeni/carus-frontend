"use client";

import * as Sentry from "@sentry/nextjs";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const router = useRouter();

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-svh w-full text-center p-4">
          <div className="text-red-500 mb-4">
            <TriangleAlert size={64} />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-500 mb-6">
            {/* @ts-expect-error response message untyped */}
            {error?.response?.data?.message ||
              error?.message ||
              "An unexpected error occurred."}
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button onClick={() => reset()} className="px-6">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="px-6"
            >
              Go Home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
