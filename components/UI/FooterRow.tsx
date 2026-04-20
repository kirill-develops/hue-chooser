import theme from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type FooterRowProps = {
   children: ReactNode;
   style?: ViewProps["style"];
};

export function FooterRow({ children, style, ...props }: FooterRowProps) {
   return (
      <View
         style={[styles.footerRow, style]}
         {...props}
      >
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.marginTopFooter,
   },
});
