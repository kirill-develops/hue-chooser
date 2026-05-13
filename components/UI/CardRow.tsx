import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type CardRowProps = {
   children: ReactNode;
   variant?: "default" | "column" | "row";
   style?: ViewProps["style"];
};

export default function CardRow({
   children,
   variant = "default",
   style,
   ...props
}: CardRowProps) {
   const styles = makeStyles(useTheme());

   return (
      <View
         style={[styles[variant], style]}
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
      column: {
         flexDirection: "column",
         gap: theme.spacing.gapColumnRow,
      },
      row: {
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "center",
      },
   });
}
