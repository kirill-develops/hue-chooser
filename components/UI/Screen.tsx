import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ style, ...props }: ViewProps) {
   const styles = makeStyles(useTheme());

   return (
      <SafeAreaView
         style={[styles.screen, style]}
         {...props}
      />
   );
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      screen: {
         flex: 1,
         backgroundColor: theme.colors.background,
         justifyContent: "center",
         paddingHorizontal: theme.spacing.pagePadding,
      },
   });
}
