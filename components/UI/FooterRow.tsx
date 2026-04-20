import theme from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export function FooterRow({ children }: { children: ReactNode }) {
   return <View style={styles.footerRow}>{children}</View>;
}

const styles = StyleSheet.create({
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.marginTopFooter,
   },
});
