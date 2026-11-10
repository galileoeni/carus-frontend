import { Wallet } from "lucide-react";

import PortalComingSoon from "@/components/business/coming-soon";
import HqOnly from "@/components/business/hq-only";

export const metadata = { title: "Payments" };

export default function BusinessPaymentsPage() {
  return (
    <HqOnly title="Payments">
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
    </HqOnly>
  );
}
