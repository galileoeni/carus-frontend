import type { Metadata } from "next";
import { Suspense } from "react";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import DonationResult from "@/components/public-campaigns/donation-result";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <div>
      <NavBar />
      <main className="max-w-xl mx-auto px-5 pt-28 md:pt-20 pb-10 min-h-[60svh]">
        <Suspense>
          <DonationResult />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
