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

interface ButtonProps {
   title: string;
   variant?: "primary" | "social" | "socialAlt";
}

export default function Button({
   style,
   title,
   variant = "primary",
   ...props
}: PressableProps & ButtonProps) {
   const buttonStyles: StyleProp<ViewStyle>[] = [styles.buttonBase];
   const textStyles: StyleProp<TextStyle>[] = [styles.buttonText];

   let pressedStyle: StyleProp<ViewStyle>;

   if (variant === "primary") {
      buttonStyles.push(styles.primaryButton);
      textStyles.push(styles.primaryText);
      pressedStyle = styles.pressedPrimary;
   } else if (variant === "social") {
      buttonStyles.push(styles.socialButton);
      textStyles.push(styles.socialText);
      pressedStyle = styles.pressedSocial;
   } else {
      buttonStyles.push(styles.socialAltButton);
      textStyles.push(styles.socialAltText);
      pressedStyle = styles.pressedSocialAlt;
   }

   const combinedButtonStyle =
      typeof style === "function"
         ? (state: PressableStateCallbackType) =>
              [
                 buttonStyles,
                 state.pressed ? pressedStyle : null,
                 style(state),
              ].filter(Boolean)
         : (state: PressableStateCallbackType) =>
              [buttonStyles, state.pressed ? pressedStyle : null, style].filter(
                 Boolean,
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
   socialText: {
      fontSize: theme.fontSize.social,
      color: theme.colors.socialText,
   },
   socialAltText: {
      fontSize: theme.fontSize.social,
      color: theme.colors.text,
   },
});
