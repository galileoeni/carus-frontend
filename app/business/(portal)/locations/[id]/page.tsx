import HqOnly from "@/components/business/hq-only";
import BranchDetail from "@/components/business/locations/branch-detail";

export const metadata = { title: "Location" };

export default async function BranchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <HqOnly title="Location">
      <BranchDetail id={id} />
    </HqOnly>
  );
}
