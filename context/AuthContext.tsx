import { createContext, ReactNode, useContext, useState } from "react";

type User = {
   email: string;
   name?: string;
};

type Session = {
   user: User;
};

type AuthContextType = {
   session: Session | null;
   login: (email: string) => void;
   signup: (name: string, email: string, password: string) => void;
   logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
   const [session, setSession] = useState<Session | null>(null);

   const login = (email: string) => {
      setSession({ user: { email } });
   };

   const signup = (name: string, email: string, password: string) => {
      setSession({ user: { name, email } });
   };

   const logout = () => {
      setSession(null);
   };

   return (
      <AuthContext.Provider value={{ session, login, signup, logout }}>
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
