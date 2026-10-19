import type { Metadata } from "next";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import ImpactPage from "@/components/impact";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "How much plastic Carus Recycling has kept out of Nigeria's streets and waterways, and the CO₂ emissions that recycling it avoided.",
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Our Impact | Carus Recycling",
    description:
      "The plastic Carus has recycled across Nigeria, and the CO₂ emissions it avoided.",
    url: "https://carus.com.ng/impact",
  },
};

export default function Impact() {
  return (
    <div>
      <NavBar />
      <main className="mt-16 md:mt-5">
        <ImpactPage />
      </main>
      <Footer />
    </div>
  );
}
