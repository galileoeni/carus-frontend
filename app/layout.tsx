import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/auth-context";
import { SocketProvider } from "@/context/socket-context";
import WakeServer from "@/components/wake-server";

import { GoogleAuthProvider } from "./google-auth-provider";
import QueryProvider from "./query-provider";

import "./globals.css";

export const metadata: Metadata = {
  // 1. Basic Metadata
  title: {
    default: "Carus Recycling | Effortless Waste Scheduling & Rewards",
    template: "%s | Carus Recycling",
  },
  description:
    "Simplify waste management with Carus. Schedule pickups for plastics, electronics, or organics and earn points redeemable for gift cards, airtime, and cash. Join our community for a greener planet.",
  keywords: [
    "waste management",
    "recycling rewards",
    "schedule waste pickup",
    "earn from recycling",
    "eco-friendly rewards",
    "Carus Recycling",
  ],
  authors: [{ name: "Abdrahman Oladimeji (Rahmlad)" }],
  creator: "Carus Recycling",

  // 2. Technical Settings
  metadataBase: new URL("https://carus.com.ng"),
  alternates: {
    canonical: "/",
  },

  // 3. Open Graph (Facebook, LinkedIn, Discord)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carus.com.ng",
    siteName: "Carus Recycling",
    title: "Carus Recycling | Waste Management & Rewards",
    description:
      "Effortless waste scheduling for a cleaner planet. Earn rewards like airtime and gift cards for every eco-friendly action.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Carus Recycling - Schedule Pickups and Earn Rewards",
      },
    ],
  },

  // 4. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Carus Recycling | Recycle & Earn Rewards",
    description:
      "Join Carus to schedule easy waste pickups and get rewarded for being environmentally conscious.",
    creator: "@carusrecycling",
  },

  // 5. Icons & Manifest
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

const satoshi = localFont({
  src: "./Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="tawk-to" strategy="lazyOnload">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/697ec1b000b4001c36a04b88/1jgbi96n2';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Carus Recycling",
            url: "https://carus.com.ng",
            logo: "https://carus.com.ng/icon.svg",
            description:
              "A platform for waste scheduling and recycling rewards.",
            address: {
              "@type": "PostalAddress",
              addressCountry: "NG",
            },
          }),
        }}
      />
      <body className={satoshi.className}>
        <QueryProvider>
          <GoogleAuthProvider>
            <UserProvider>
              <SocketProvider>
                <WakeServer />
                {children}
              </SocketProvider>
            </UserProvider>
          </GoogleAuthProvider>
          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
