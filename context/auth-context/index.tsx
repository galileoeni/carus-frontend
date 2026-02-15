"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type AuthUser = {
  username: string | null;
  email: string;
  status: string;
  refresh_token: string;
  refresh_token_expires: number;
  access_token: string;
  access_token_expires: number;
};

const UserContext = createContext<{
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
