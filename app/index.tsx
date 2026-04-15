import Button from "@/components/Button";
import Input from "@/components/Input";
import theme from "@/theme";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

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
               <Input
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
               />
            </View>

            <View style={styles.inputGroup}>
               <Text style={styles.label}>Password</Text>
               <Input
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
               />
            </View>

            <Button
               title="Sign in"
               onPress={handleSignIn}
               variant="primary"
            />

            <Text style={styles.orText}>or continue with</Text>

            <View style={styles.socialRow}>
               <Button
                  title="Sign in with Google"
                  onPress={() => {}}
                  variant="social"
               />
               <Button
                  title="Sign in with Apple"
                  onPress={() => {}}
                  variant="socialAlt"
               />
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
