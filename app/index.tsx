import { theme } from "@/theme";
import { useState } from "react";
import {
   Alert,
   Pressable,
   StyleSheet,
   Text,
   TextInput,
   View,
} from "react-native";

export default function Index() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSignIn = () => {
      Alert.alert("Sign In", `Email: ${email}\nPassword: ${password}`);
   };

   return (
      <View style={styles.page}>
         <View style={styles.card}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
               Sign in to continue to Hue Chooser.
            </Text>

            <View style={styles.inputGroup}>
               <Text style={styles.label}>Email</Text>
               <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={theme.colors.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
               />
            </View>

            <View style={styles.inputGroup}>
               <Text style={styles.label}>Password</Text>
               <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.placeholder}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
               />
            </View>

            <Pressable
               style={styles.primaryButton}
               onPress={handleSignIn}
            >
               <Text style={styles.primaryButtonText}>Sign in</Text>
            </Pressable>

            <Text style={styles.orText}>or continue with</Text>

            <View style={styles.socialRow}>
               <Pressable style={styles.socialButton}>
                  <Text style={styles.socialText}>Sign in with Google</Text>
               </Pressable>
               <Pressable style={styles.socialButtonAlt}>
                  <Text style={styles.socialTextAlt}>Sign in with Apple</Text>
               </Pressable>
            </View>

            <View style={styles.footerRow}>
               <Text style={styles.footerText}>Forgot password?</Text>
               <Text style={[styles.footerText, styles.footerLink]}>
                  Create account
               </Text>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   page: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.pagePadding,
   },
   card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.card,
      padding: theme.spacing.cardPadding,
      shadowColor: theme.colors.shadow,
      shadowOffset: theme.shadow.offset,
      shadowOpacity: theme.shadow.opacity,
      shadowRadius: theme.shadow.radius,
      elevation: theme.shadow.elevation,
   },
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
   inputGroup: {
      marginBottom: theme.spacing.marginBottomInputGroup,
   },
   label: {
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.marginBottomLabel,
      fontSize: theme.fontSize.label,
      textTransform: "uppercase",
      letterSpacing: 0.8,
   },
   input: {
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.borderRadius.input,
      color: theme.colors.inputText,
      paddingHorizontal: theme.spacing.inputPaddingHorizontal,
      paddingVertical: theme.spacing.inputPaddingVertical,
      fontSize: theme.fontSize.input,
   },
   primaryButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.button,
      paddingVertical: theme.spacing.buttonPaddingVertical,
      alignItems: "center",
      marginTop: theme.spacing.marginTopButton,
   },
   primaryButtonText: {
      color: theme.colors.text,
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.fontSize.button,
   },
   orText: {
      color: theme.colors.orText,
      textAlign: "center",
      marginVertical: theme.spacing.marginVerticalOr,
      fontSize: theme.fontSize.or,
   },
   socialRow: {
      flexDirection: "column",
      gap: theme.spacing.gapSocialRow,
   },
   socialButton: {
      backgroundColor: theme.colors.socialButton,
      borderRadius: theme.borderRadius.button,
      paddingVertical: theme.spacing.socialButtonPaddingVertical,
      alignItems: "center",
   },
   socialButtonAlt: {
      backgroundColor: theme.colors.socialButtonAlt,
      borderRadius: theme.borderRadius.button,
      paddingVertical: theme.spacing.socialButtonPaddingVertical,
      alignItems: "center",
   },
   socialText: {
      color: theme.colors.socialText,
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.fontSize.social,
   },
   socialTextAlt: {
      color: theme.colors.text,
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.fontSize.social,
   },
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.marginTopFooter,
   },
   footerText: {
      color: theme.colors.footerText,
      fontSize: theme.fontSize.footer,
   },
   footerLink: {
      color: theme.colors.footerLink,
   },
});
