import { FileText } from "lucide-react";

import PortalComingSoon from "@/components/business/coming-soon";

export const metadata = { title: "Reports" };

export default function BusinessReportsPage() {
  return (
    <PortalComingSoon
      icon={FileText}
      title="Reports"
      description="Monthly PDF reports of what you recycled with Carus, ready for your ESG and sustainability records."
      points={[
        "Sent automatically at the end of every month",
        "Or request one and get it within 72 hours",
        "Download any past month's report",
      ]}
    />
  );
}
