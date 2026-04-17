import theme from "@/theme";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Card({ style, ...props }: ViewProps) {
   return (
      <View
         style={[styles.card, style]}
         {...props}
      />
   );
}

const styles = StyleSheet.create({
   card: {
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
