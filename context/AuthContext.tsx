import * as SecureStore from "expo-secure-store";
import {
   createContext,
   ReactNode,
   useContext,
   useEffect,
   useState,
} from "react";

type User = {
   email: string;
   name?: string;
};

type Session = {
   user: User;
};

type AuthContextType = {
   session: Session | null;
   isSessionLoading: boolean;
   login: (email: string) => Promise<void>;
   signup: (name: string, email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_STORAGE_KEY = "auth_session";

export function AuthProvider({ children }: { children: ReactNode }) {
   const [session, setSession] = useState<Session | null>(null);
   const [isSessionLoading, setIsSessionLoading] = useState(true);

   useEffect(() => {
      const loadSession = async () => {
         try {
            const storedSession =
               await SecureStore.getItemAsync(SESSION_STORAGE_KEY);
            if (storedSession) {
               setSession(JSON.parse(storedSession) as Session);
            }
         } catch (error) {
            console.warn("Failed to load session", error);
         } finally {
            setIsSessionLoading(false);
         }
      };

      void loadSession();
   }, []);

   const login = async (email: string) => {
      const nextSession = { user: { email } };
      setSession(nextSession);
      await SecureStore.setItemAsync(
         SESSION_STORAGE_KEY,
         JSON.stringify(nextSession),
      );
   };

   const signup = async (name: string, email: string, password: string) => {
      const nextSession = { user: { name, email } };
      setSession(nextSession);
      await SecureStore.setItemAsync(
         SESSION_STORAGE_KEY,
         JSON.stringify(nextSession),
      );
   };

   const logout = async () => {
      setSession(null);
      await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
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
