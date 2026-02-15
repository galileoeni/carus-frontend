"use client";

import { useGetProfile } from "@/queries/account";
import { usePathname } from "next/navigation";
import NotificationBell from "@/components/notification-bell";
import { toast } from "sonner";
import UserDropdown from "./UserDropdown";

export const TopNav = () => {
  const { data, isPending, isError, error } = useGetProfile();
  const pathname = usePathname();

  // Function to handle dynamic routes
  const getTitle = (path: string) => {
    if (path.startsWith("/schedule")) return "Schedule";
    if (path.startsWith("/wallet/donate")) return "Donate";
    if (path.startsWith("/wallet")) return "Wallet";
    if (path.startsWith("/settings")) return "Settings";
    if (path.startsWith("/notifications")) return "Notifications";
    return null;
  };

  const title = getTitle(pathname || "");

  if (isError) {
    toast.error("Error getting your details", {
      description: error?.response?.data?.message || error?.message,
    });
  }

  return (
    <header>
      <div className="fixed top-0 z-40 bg-white flex justify-between items-center px-4 md:pr-12 h-25 md:h-20 md:pt-18 md:pb-10 w-full md:w-[calc(100%-16rem)]">
        {title ? (
          <h1 className="text-xl md:text-3xl font-black">{title}</h1>
        ) : (
          <div>
            {isPending && (
              <h1 className="text-xl md:text-3xl font-black inline-flex">
                Hi{" "}
                <div
                  aria-label="User"
                  className="ml-1.5 w-[200px] animate-pulse bg-grey-10 h-7 my-auto rounded"
                ></div>
                ,
              </h1>
            )}
            {data?.data && (
              <h1 className="text-xl md:text-3xl font-black">
                Hi{" "}
                {data.data.first_name.charAt(0).toUpperCase() +
                  data.data.first_name.slice(1)}
                ,
              </h1>
            )}
            <p className="text-sm md:text-base">
              Let&apos;s keep our Environment Clean
            </p>
          </div>
        )}

        <div className="hidden md:flex items-center gap-5">
          <NotificationBell />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
