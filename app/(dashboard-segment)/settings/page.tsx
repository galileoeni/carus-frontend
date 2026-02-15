"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import HelpandComplaints from "@/components/help-complaints";
import Profile from "@/components/profile";
import Account from "@/components/account";

function SettingsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "profile";

  const tabs = [
    { label: "Profile", value: "profile" },
    { label: "Security", value: "security" },
    // { label: "Notification", value: "notification" },
    { label: "Help and Complaints", value: "help" },
  ];

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center space-x-7 md:space-x-10 relative pt-25 md:pt-30">
        {tabs.map((tab) => (
          <div key={tab.value} className="flex flex-col items-center">
            <button
              onClick={() => handleTabChange(tab.value)}
              className={`pb-1 px-3 md:px-5 transition-colors ${
                currentTab === tab.value
                  ? "text-primary-60 text-sm md:text-xl font-bold"
                  : "text-grey-40 text-sm md:text-xl"
              }`}
            >
              {tab.label}
            </button>

            {/* Active underline */}
            {currentTab === tab.value && (
              <div className="w-full h-[4px] bg-primary-50 rounded-[30px]"></div>
            )}
          </div>
        ))}
      </div>

      {/* Separator line */}
      <div className="w-full h-[2px] bg-[#CCE1D7] rounded-[30px]"></div>

      {/* Tab Content */}
      <div className="mt-6">
        {currentTab === "profile" && <Profile />}
        {currentTab === "security" && <Account />}
        {/* {currentTab === "notification" && <Notification />} */}
        {currentTab === "help" && <HelpandComplaints />}
      </div>
    </div>
  );
}

// 2. Wrap in Suspense to prevent "useSearchParams" build-time errors
export default function Settings() {
  return (
    <Suspense fallback={<div>Loading Settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
