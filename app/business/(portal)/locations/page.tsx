import HqOnly from "@/components/business/hq-only";
import BusinessLocations from "@/components/business/locations";

export const metadata = { title: "Locations" };

export default function BusinessLocationsPage() {
  return (
    <HqOnly title="Locations">
      <BusinessLocations />
    </HqOnly>
  );
}
