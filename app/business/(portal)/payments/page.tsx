import { Wallet } from "lucide-react";

import PortalComingSoon from "@/components/business/coming-soon";

export const metadata = { title: "Payments" };

export default function BusinessPaymentsPage() {
  return (
    <PortalComingSoon
      icon={Wallet}
      title="Payments"
      description="Get paid for your recyclables, worked out per kg for each material."
      points={[
        "Add the bank account you want to be paid into",
        "Request a payout, paid within 24 hours",
        "Or get paid automatically at the end of each month",
      ]}
    />
  );
}
