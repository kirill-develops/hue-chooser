import { darkTheme, lightTheme, Theme } from "@/theme";
import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const scheme = useColorScheme();
   const theme = scheme === "light" ? lightTheme : darkTheme;

   return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
   );
}

export function useTheme() {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
   }
   return context;
}
