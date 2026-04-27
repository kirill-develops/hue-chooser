import { useThemedStyles } from "@/context/ThemeContext";
import { Theme } from "@/theme";
import { StyleSheet, Text, TextProps } from "react-native";

export function Title({ style, ...props }: TextProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <Text
         style={[styles.title, style]}
         {...props}
      />
   );
}

export function Subtitle({ style, ...props }: TextProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <Text
         style={[styles.subtitle, style]}
         {...props}
      />
   );
}

export function Body({ style, ...props }: TextProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <Text
         style={[styles.body, style]}
         {...props}
      />
   );
}

export function Label({ style, ...props }: TextProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <Text
         style={[styles.label, style]}
         {...props}
      />
   );
}

export function OrText({ style, ...props }: TextProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <Text
         style={[styles.orText, style]}
         {...props}
      />
   );
}

export function FooterText({ style, ...props }: TextProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <Text
         style={[styles.footerText, style]}
         {...props}
      />
   );
}

export function LinkText({ style, ...props }: TextProps) {
   const styles = useThemedStyles(makeStyles);

   return (
      <Text
         style={[styles.footerText, styles.footerLink, style]}
         {...props}
      />
   );
}

function makeStyles(theme: Theme) {
   return StyleSheet.create({
      title: {
         color: theme.colors.text,
         fontSize: theme.fontSize.title,
         fontWeight: theme.fontWeight.bold,
         marginBottom: theme.spacing.marginBottomTitle,
      },
      subtitle: {
         color: theme.colors.textSecondary,
         fontSize: theme.fontSize.subtitle,
         lineHeight: 22,
         marginBottom: theme.spacing.marginBottomSubtitle,
      },
      body: {
         color: theme.colors.text,
         fontSize: theme.fontSize.button,
      },
      label: {
         color: theme.colors.textMuted,
         marginBottom: theme.spacing.marginBottomLabel,
         fontSize: theme.fontSize.label,
         textTransform: "uppercase",
         letterSpacing: 0.8,
      },
      orText: {
         color: theme.colors.orText,
         textAlign: "center",
         marginVertical: theme.spacing.marginVerticalOr,
         fontSize: theme.fontSize.or,
      },
      footerText: {
         color: theme.colors.footerText,
         fontSize: theme.fontSize.footer,
      },
      footerLink: {
         color: theme.colors.footerLink,
      },
   });
}
