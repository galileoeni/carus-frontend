/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import cookie from "@/services/cookie";
import { registerLogoutHandler, registerQueryClient } from "@/services/http";
import { CustomError } from "@/tanstack-query";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      additionalDescription?: string;
      errorMessage?: string;
    };
    defaultError: CustomError;
  }
}

// Send people back to the login for the part of the site they were using
const loginPath = () =>
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/business")
    ? "/business/login"
    : "/login";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Created once; a new client on every render would wipe all cached data
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onSuccess: (_data, _variables, _context, mutation) => {
            if (mutation.meta?.invalidatesQuery) {
              queryClient.invalidateQueries({
                queryKey: mutation.meta?.invalidatesQuery,
              });
            }
            toast.success(mutation.meta?.successMessage || "Successful!.", {
              description: mutation.meta?.additionalDescription,
            });
          },
          onError: (_error, _variables, _context, mutation) => {
            toast.error(mutation.meta?.errorMessage || "An error occured.", {
              description: _error.response?.data?.message,
            });
          },
          onSettled: (_data, _error, _variables, _context, mutation) => {},
        }),
      }),
  );

  registerQueryClient(queryClient);
  registerLogoutHandler((reason) => {
    // shared cleanup
    cookie.deleteAll();
    // optionally clear app-specific state here

    if (reason === "expired") {
      // show modal or a specific toast for session expiration
      toast.info("Session expired", {
        description: "Your session expired. You are being redirected to login.",
      });
      // give user a moment to read then redirect
      setTimeout(() => router.push(loginPath()), 1200);
    } else if (reason === "user") {
      // voluntary logout
      toast.info("Logging out.", {
        description: "You are being signed out of CARUS.",
      });
      router.push("/");
    } else {
      // fallback
      toast.info("Signed out", { description: "You were signed out." });
      router.push(loginPath());
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
