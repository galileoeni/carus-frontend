"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, HandHeart, Handshake, Users } from "lucide-react";

import { usePublicCampaigns } from "@/queries/donation";
import { LEGAL_CONTACT_EMAIL } from "@/components/legal";
import { LoadingComponent } from "@/components/loading";
import { formatToLocaleNaira } from "@/lib/helpers";
import type { PublicCampaign } from "@/types/donation";
import DonateMoneyDialog from "./donate-money-dialog";

const daysLeft = (endDate: string) => {
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

function CampaignCard({ campaign }: { campaign: PublicCampaign }) {
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [donating, setDonating] = useState(false);
  const raised = campaign.amountRaised || 0;
  const target = campaign.target || 0;
  const progress = target > 0 ? Math.min((raised / target) * 100, 100) : 0;
  const remaining = daysLeft(campaign.duration);
  const isOpen = campaign.status === "active" && remaining > 0;

  return (
    <article className="bg-white border border-grey-10 rounded-[18px] overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[16/9] bg-primary-10">
        {campaign.image && !imageFailed ? (
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <HandHeart className="size-14 text-primary-60" />
          </div>
        )}
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
            isOpen ? "bg-white text-primary-60" : "bg-grey-90 text-white"
          }`}
        >
          {isOpen ? `${remaining} days left` : "Completed"}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg xl:text-xl font-bold">{campaign.title}</h3>
        <p
          className={`mt-2 text-grey-90 text-sm whitespace-pre-line ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {campaign.description}
        </p>
        {campaign.description.length > 160 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 self-start text-sm text-primary-60 font-bold cursor-pointer"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        <div className="mt-auto pt-5">
          <div className="w-full h-[6px] bg-primary-10 rounded-[20px]">
            <div
              className="h-full bg-[rgb(86,155,122)] rounded-[20px]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <p>
              <span className="font-bold">₦{formatToLocaleNaira(raised)}</span>{" "}
              <span className="text-grey-40">
                of ₦{formatToLocaleNaira(target)}
              </span>
            </p>
            <p className="text-grey-90">{Math.round(progress)}%</p>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-grey-90">
            <Users className="size-4" />
            {campaign.numberOfDonors}{" "}
            {campaign.numberOfDonors === 1 ? "donor" : "donors"}
          </p>

          {isOpen && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 whitespace-nowrap">
              <button
                onClick={() => setDonating(true)}
                className="cursor-pointer h-11 flex items-center justify-center gap-2 bg-primary-60 hover:bg-primary-50 text-white rounded-[10px] text-sm font-bold"
              >
                <HandHeart className="size-4" />
                Donate money
              </button>
              <Link
                href={`/wallet/donate/${campaign.id}`}
                className="h-11 flex items-center justify-center gap-2 border border-primary-60 text-primary-60 hover:bg-primary-10 rounded-[10px] text-sm font-bold"
              >
                <Gift className="size-4" />
                Donate earnings
              </Link>
            </div>
          )}
        </div>
      </div>
      {donating && (
        <DonateMoneyDialog
          campaign={campaign}
          onClose={() => setDonating(false)}
        />
      )}
    </article>
  );
}

export default function PublicCampaigns() {
  const { data, isLoading, error } = usePublicCampaigns();
  const campaigns = data?.data ?? [];
  const active = campaigns.filter(
    (c) => c.status === "active" && daysLeft(c.duration) > 0,
  );
  const past = campaigns.filter((c) => !active.includes(c));
  const totalRaised = campaigns.reduce((sum, c) => sum + c.amountRaised, 0);
  const totalDonations = campaigns.reduce(
    (sum, c) => sum + c.numberOfDonors,
    0,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingComponent description="Loading projects..." />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-20">
        We couldn&apos;t load our projects right now. Please try again later.
      </p>
    );
  }

  if (campaigns.length === 0) {
    return (
      <section className="border border-grey-10 rounded-[18px] px-6 py-12 md:py-16 text-center flex flex-col items-center">
        <div className="bg-primary-10 rounded-full p-4">
          <Handshake className="size-10 text-primary-60" />
        </div>
        <p className="mt-6 text-xs font-bold tracking-widest uppercase text-primary-60">
          Coming soon
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-black">
          Our first NGO projects are on the way
        </h2>
        <p className="mt-3 max-w-xl text-grey-90">
          We&apos;re choosing the organisations we&apos;ll support first. Run an
          NGO working on the environment or your community? Partner with Carus
          and let people support your work with their recycling.
        </p>
        <a
          href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=${encodeURIComponent("NGO partnership with Carus")}`}
          className="mt-8 px-6 py-3 bg-primary-60 hover:bg-primary-50 text-white font-bold rounded-lg"
        >
          Partner with us
        </a>
      </section>
    );
  }

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-3 gap-3 md:gap-6 text-center">
        {[
          {
            label: "Raised for NGOs",
            value: `₦${Math.round(totalRaised).toLocaleString()}`,
          },
          { label: "Donations made", value: totalDonations.toLocaleString() },
          {
            label: "Projects supported",
            value: campaigns.length.toLocaleString(),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-primary-10 rounded-[14px] py-5 px-2"
          >
            <p className="text-lg md:text-3xl font-black text-primary-60">
              {stat.value}
            </p>
            <p className="mt-1 text-xs md:text-base text-grey-90">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {active.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            Current projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            Past projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
