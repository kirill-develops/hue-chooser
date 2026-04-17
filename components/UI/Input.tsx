import theme from "@/theme";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export default function Input({ style, ...props }: TextInputProps) {
   return (
      <TextInput
         style={[styles.input, style]}
         placeholderTextColor={theme.colors.placeholder}
         {...props}
      />
   );
}

const styles = StyleSheet.create({
   input: {
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.borderRadius.input,
      color: theme.colors.inputText,
      paddingHorizontal: theme.spacing.inputPaddingHorizontal,
      paddingVertical: theme.spacing.inputPaddingVertical,
      fontSize: theme.fontSize.input,
   },
});
