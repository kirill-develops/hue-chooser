import { fetchUser } from "@/db/users";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import {
   createContext,
   ReactNode,
   useContext,
   useEffect,
   useState,
} from "react";
import { AppState } from "react-native";

type AuthContextType = {
   session: Session | null;
   isSessionLoading: boolean;
   login: (email: string, password: string) => Promise<void>;
   signup: (name: string, email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
   const [session, setSession] = useState<Session | null>(null);
   const [isSessionLoading, setIsSessionLoading] = useState(true);
   const queryClient = useQueryClient();

   useEffect(() => {
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, currentSession) => {
         console.log("auth event:", event, "session:", !!currentSession);

         setTimeout(async () => {
            if (currentSession) {
               const user = await fetchUser(currentSession?.user.id);
               queryClient.setQueryData(["user", currentSession.user.id], user);

               setSession(currentSession);
            } else {
               setSession(null);
               queryClient.clear();
            }
            setIsSessionLoading(false);
         }, 0);
      });

      AppState.addEventListener("change", (state) => {
         if (state === "active") supabase.auth.startAutoRefresh();
         else supabase.auth.stopAutoRefresh();
      });

      return () => {
         subscription.unsubscribe();
      };
   }, [queryClient]);

   const login = async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      if (error) {
         throw error;
      }
   };

   const signup = async (name: string, email: string, password: string) => {
      const { error } = await supabase.auth.signUp({
         email,
         password,
         options: {
            data: { name },
         },
      });

      if (error) {
         throw error;
      }
   };

   const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
         throw error;
      }
   };

   return (
      <AuthContext.Provider
         value={{ session, isSessionLoading, login, signup, logout }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within AuthProvider");
   }
   return context;
}
