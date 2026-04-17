import theme from "@/theme";
import {
   Pressable,
   PressableProps,
   PressableStateCallbackType,
   StyleProp,
   StyleSheet,
   Text,
   TextStyle,
   ViewStyle,
} from "react-native";

type ButtonProps = PressableProps & {
   title: string;
   variant?: "primary" | "secondary" | "social" | "socialAlt";
};

export default function Button({
   style,
   title,
   variant = "primary",
   ...props
}: ButtonProps) {
   const { combinedButtonStyle, textStyles } = getButtonVariantStyles(
      variant,
      style,
   );

   return (
      <Pressable
         style={combinedButtonStyle}
         {...props}
      >
         <Text style={textStyles}>{title}</Text>
      </Pressable>
   );
}

const getButtonVariantStyles = (
   variant: "primary" | "secondary" | "social" | "socialAlt",
   style?: PressableProps["style"],
) => {
   const { button, text, pressed } = variantStyles[variant];

   const buttonStyles: StyleProp<ViewStyle>[] = [styles.buttonBase, button];
   const textStyles: StyleProp<TextStyle>[] = [styles.buttonText, text];

   const combinedButtonStyle = (state: PressableStateCallbackType) =>
      [
         buttonStyles,
         state.pressed ? pressed : null,
         typeof style === "function" ? style(state) : style,
      ].filter(Boolean);

   return { combinedButtonStyle, textStyles };
};

const styles = StyleSheet.create({
   buttonBase: {
      borderRadius: theme.borderRadius.button,
      alignItems: "center",
   },
   primaryButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.buttonPaddingVertical,
      marginTop: theme.spacing.marginTopButton,
   },
   secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.primary,
      paddingVertical: theme.spacing.buttonPaddingVertical,
      marginTop: theme.spacing.marginTopButton,
   },
   socialButton: {
      backgroundColor: theme.colors.socialButton,
      paddingVertical: theme.spacing.socialButtonPaddingVertical,
   },
   socialAltButton: {
      backgroundColor: theme.colors.socialButtonAlt,
      paddingVertical: theme.spacing.socialButtonPaddingVertical,
   },
   pressedPrimary: {
      opacity: 0.8,
   },
   pressedSecondary: {
      opacity: 0.3,
   },
   pressedSocial: {
      opacity: 0.7,
   },
   pressedSocialAlt: {
      opacity: 0.7,
   },
   buttonText: {
      fontWeight: theme.fontWeight.bold,
   },
   primaryText: {
      fontSize: theme.fontSize.button,
      color: theme.colors.text,
   },
   secondaryText: {
      fontSize: theme.fontSize.button,
      color: theme.colors.primary,
   },
   socialText: {
      fontSize: theme.fontSize.social,
      color: theme.colors.socialText,
   },
   socialAltText: {
      fontSize: theme.fontSize.social,
      color: theme.colors.text,
   },
});

const variantStyles = {
   primary: {
      button: styles.primaryButton,
      text: styles.primaryText,
      pressed: styles.pressedPrimary,
   },
   secondary: {
      button: styles.secondaryButton,
      text: styles.secondaryText,
      pressed: styles.pressedSecondary,
   },
   social: {
      button: styles.socialButton,
      text: styles.socialText,
      pressed: styles.pressedSocial,
   },
   socialAlt: {
      button: styles.socialAltButton,
      text: styles.socialAltText,
      pressed: styles.pressedSocialAlt,
   },
} as const;
