import { useThemedStyles } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Screen({ style, ...props }: ViewProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <View
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
