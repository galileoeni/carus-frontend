import { useQuery } from "@tanstack/react-query";

import { getImpact } from "@/services/impact";

export const useImpact = () =>
  useQuery({
    queryKey: ["impact"],
    queryFn: getImpact,
  });
