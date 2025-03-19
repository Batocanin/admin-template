"use client";

import { createContext, useContext } from "react";
import { User } from "../(auth)/AuthTypes";

interface SessionContext {
  user: User;
}

const SessionContext = createContext<SessionContext | null>(null);

function AuthUserSessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useAuthSession must be used within a Session Provider");
  }
  return context;
}

export default AuthUserSessionProvider;
