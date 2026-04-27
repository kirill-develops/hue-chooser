import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export default function Input({ style, ...props }: TextInputProps) {
   const theme = useTheme();
   const styles = useThemedStyles(makeStyles);

   return (
      <TextInput
         style={[styles.input, style]}
         placeholderTextColor={theme.colors.placeholder}
         {...props}
      />
   );
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      input: {
         backgroundColor: theme.colors.inputBackground,
         borderRadius: theme.borderRadius.input,
         color: theme.colors.inputText,
         paddingHorizontal: theme.spacing.inputPaddingHorizontal,
         paddingVertical: theme.spacing.inputPaddingVertical,
         fontSize: theme.fontSize.input,
      },
   });
}
