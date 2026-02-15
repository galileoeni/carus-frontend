import NavBar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import Services from "@/components/services";
import Community from "@/components/community";
import Faqs from "@/components/faqs";
import DownloadSection from "@/components/download-section";
import Footer from "@/components/footer";

export const metadata = {
  title: "Carus Recycling | Effortless Waste Scheduling & Rewards",
  description:
    "Join Carus Recycling to simplify your waste management. Schedule quick pickups and earn points redeemable for gift cards, airtime, and cash.",
  openGraph: {
    title: "Carus Recycling | Waste Management & Rewards",
    description:
      "Effortless waste scheduling for a cleaner planet. Earn rewards for every donation and pickup.",
    images: ["/opengraph-image.png"], // Uses your file from the tree
  },
};

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Services />
      <Community />
      <DownloadSection />
      <Faqs />
      <Footer />
    </div>
  );
}
