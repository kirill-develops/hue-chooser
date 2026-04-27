import { useThemedStyles } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type CardRowProps = {
   children: ReactNode;
   variant?: "default" | "column";
   style?: ViewProps["style"];
};

export default function CardRow({
   children,
   variant = "default",
   style,
   ...props
}: CardRowProps) {
   const styles = useThemedStyles(makeStyles);
   const variantStyle =
      variant === "column" ? styles.columnRow : styles.default;

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
         alignItems: "center",
         marginVertical: theme.spacing.marginVerticalOr,
      },
      columnRow: {
         flexDirection: "column",
         gap: theme.spacing.gapColumnRow,
      },
   });
}
