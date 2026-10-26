"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheck, CircleX, Clock } from "lucide-react";

import { LoadingComponent } from "@/components/loading";
import { useCashDonation } from "@/queries/donation";

export default function DonationResult() {
  // Paystack adds ?reference=...&trxref=... when it sends the donor back
  const params = useSearchParams();
  const reference = params.get("reference") ?? params.get("trxref");
  const { data, isLoading, error } = useCashDonation(reference);
  const payment = data?.data;

  if (!reference || error) {
    return (
      <Result
        icon={<CircleX className="size-14 text-red-500" />}
        title="We couldn't find this donation"
        body="If you were charged, please contact us at carusrecycling@gmail.com with your payment receipt and we'll sort it out."
      />
    );
  }

  if (isLoading || !payment) {
    return (
      <div className="flex justify-center py-20">
        <LoadingComponent description="Confirming your donation..." />
      </div>
    );
  }

  if (payment.status === "success") {
    return (
      <Result
        icon={<CircleCheck className="size-14 text-primary-60" />}
        title={`Thank you, ${payment.donorName.split(" ")[0]}!`}
        body={`Your donation of ₦${payment.amount.toLocaleString()} to ${payment.campaign.title} was received. A receipt is on its way to your email.`}
      />
    );
  }

  if (payment.status === "failed") {
    return (
      <Result
        icon={<CircleX className="size-14 text-red-500" />}
        title="Your payment didn't go through"
        body="You can try again from the projects page. If money left your account, contact us at carusrecycling@gmail.com with your receipt."
      />
    );
  }

  return (
    <Result
      icon={<Clock className="size-14 text-grey-90" />}
      title="Your payment is being confirmed"
      body="This can take a few minutes for bank transfers. You can safely leave this page; your donation will be recorded once the payment clears."
    />
  );
}

function Result({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="text-center flex flex-col items-center">
      {icon}
      <h1 className="mt-5 text-2xl md:text-3xl font-black">{title}</h1>
      <p className="mt-3 text-grey-90">{body}</p>
      <Link
        href="/donations"
        className="mt-8 px-6 py-3 bg-primary-60 hover:bg-primary-50 text-white font-bold rounded-lg"
      >
        Back to projects
      </Link>
    </div>
  );
}
