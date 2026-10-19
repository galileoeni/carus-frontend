import type { Metadata } from "next";
import Link from "next/link";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import PublicCampaigns from "@/components/public-campaigns";

export const metadata: Metadata = {
  title: "Donations",
  description:
    "See the NGO projects Carus Recycling is supporting, and turn your recycling earnings into donations.",
  alternates: { canonical: "/donations" },
  openGraph: {
    title: "Donations | Carus Recycling",
    description:
      "See the NGO projects Carus Recycling is supporting, and turn your recycling earnings into donations.",
    url: "https://carus.com.ng/donations",
  },
};

export default function DonationsPage() {
  return (
    <div>
      <NavBar />
      <main className="max-w-screen-xl mx-auto px-5 md:px-10 pt-24 md:pt-16">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-[32px] md:text-[48px] font-black leading-tight">
            Recycle for a <span className="text-primary-60">cause</span>
          </h1>
          <p className="mt-4 text-grey-90 md:text-lg">
            We partner with NGOs working on projects that matter. Every pickup
            you schedule earns you rewards, and you can give those earnings, or
            donate money directly, to the projects we support.
          </p>
        </section>

        <PublicCampaigns />

        <section className="mt-20 bg-primary-60 text-white rounded-[18px] px-6 py-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-black">
            Start recycling, start giving
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-white/80">
            Create a free account, schedule a pickup, and donate your earnings
            to the projects you care about.
          </p>
          <Link
            href="/register"
            className="inline-block mt-6 px-6 py-3 bg-white text-primary-60 font-bold rounded-lg"
          >
            Get started for free
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
