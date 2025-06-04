import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../client";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // subscribe to auth changes
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // initial check
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });

    return () => {
      data?.subscription?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
