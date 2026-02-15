"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    throw new Error(
      "Google Client ID is not defined in environment variables.",
    );
  }
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      {children}
    </GoogleOAuthProvider>
  );
}
