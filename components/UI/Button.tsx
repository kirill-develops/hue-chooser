import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/theme";
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
   variant?: "primary" | "secondary" | "social" | "socialAlt" | "link";
};

export default function Button({
   style,
   title,
   variant = "primary",
   ...props
}: ButtonProps) {
   const styles = makeStyles(useTheme());
   const { combinedButtonStyle, textStyles } = getButtonVariantStyles(
      styles,
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
   styles: ReturnType<typeof makeStyles>,
   variant: "primary" | "secondary" | "social" | "socialAlt" | "link",
   style?: PressableProps["style"],
) => {
   const { button, text, pressed } = getVariantStyles(styles)[variant];

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

function makeStyles(theme: Theme) {
   return StyleSheet.create({
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
      linkButton: {
         backgroundColor: "transparent",
         paddingVertical: 0,
         marginTop: 0,
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
      pressedLink: {
         opacity: 0.7,
      },
      buttonText: {
         fontWeight: theme.fontWeight.bold,
      },
      primaryText: {
         fontSize: theme.fontSize.button,
         color: theme.colors.buttonText,
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
         color: theme.colors.socialText,
      },
      linkText: {
         fontSize: theme.fontSize.footer,
         color: theme.colors.footerLink,
         fontWeight: "400",
      },
   });
}

const getVariantStyles = (styles: ReturnType<typeof makeStyles>) =>
   ({
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
      link: {
         button: styles.linkButton,
         text: styles.linkText,
         pressed: styles.pressedLink,
      },
   }) as const;
