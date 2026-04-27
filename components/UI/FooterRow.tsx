import { useThemedStyles } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type FooterRowProps = {
   children: ReactNode;
   style?: ViewProps["style"];
   variant?: "default" | "end";
};

export default function FooterRow({
   children,
   style,
   variant = "default",
   ...props
}: FooterRowProps) {
   const styles = useThemedStyles(makeStyles);
   const variantStyle = variant === "end" ? styles.end : styles.default;

   return (
      <View
         style={[variantStyle, style]}
         {...props}
      >
         {children}
      </View>
   );
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      default: {
         flexDirection: "row",
         justifyContent: "space-between",
         marginTop: theme.spacing.marginTopFooter,
      },
      end: {
         flexDirection: "row",
         justifyContent: "flex-end",
         marginTop: theme.spacing.marginTopFooter,
      },
   });
}
