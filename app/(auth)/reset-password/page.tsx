import Loading from "@/components/loading";
import { Suspense } from "react";
import ResetPasswordPage from "./reset-password";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
