"use client";

import { useEffect, useState } from "react";
import { getAuthAccount } from "@/services/auth";
import { AuthUser } from "@/types/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const account = getAuthAccount();
    if (account) {
      setUser(account);
    }
    setIsLoading(false);
  }, []);

  const isAuth = !!user;

  return { user, isAuth, isLoading, setUser };
}
