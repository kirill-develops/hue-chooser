import theme from "@/theme";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Screen({ style, ...props }: ViewProps) {
   return (
      <View
         style={[styles.screen, style]}
         {...props}
      />
   );
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.pagePadding,
   },
});
