import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Card({ style, ...props }: ViewProps) {
   const styles = makeStyles(useTheme());

   return (
      <View
         style={[styles.card, style]}
         {...props}
      />
   );
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      card: {
         marginTop: "auto",
         backgroundColor: theme.colors.card,
         borderRadius: theme.borderRadius.card,
         padding: theme.spacing.cardPadding,
         shadowColor: theme.colors.shadow,
         shadowOffset: theme.shadow.offset,
         shadowOpacity: theme.shadow.opacity,
         shadowRadius: theme.shadow.radius,
         elevation: theme.shadow.elevation,
      },
   });
}
