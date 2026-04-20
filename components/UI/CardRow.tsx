import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import theme from "@/theme";

type CardRowProps = {
   children: ReactNode;
   style?: ViewProps["style"];
};

export default function CardRow({ children, style, ...props }: CardRowProps) {
   return (
      <View
         style={[styles.CardRow, style]}
         {...props}
      >
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   CardRow: {
      alignItems: "center",
      marginVertical: theme.spacing.marginVerticalOr,
   },
});
