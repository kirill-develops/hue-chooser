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
                  placeholderTextColor="#888"
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
                  placeholderTextColor="#888"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
               />
            </View>

            <Pressable style={styles.primaryButton} onPress={handleSignIn}>
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
      backgroundColor: "#0a0f1f",
      justifyContent: "center",
      paddingHorizontal: 24,
   },
   card: {
      backgroundColor: "#111a35",
      borderRadius: 24,
      padding: 28,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 10,
   },
   title: {
      color: "#ffffff",
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 8,
   },
   subtitle: {
      color: "#c2c7d4",
      fontSize: 15,
      lineHeight: 22,
      marginBottom: 24,
   },
   inputGroup: {
      marginBottom: 16,
   },
   label: {
      color: "#9aa3b6",
      marginBottom: 8,
      fontSize: 13,
      textTransform: "uppercase",
      letterSpacing: 0.8,
   },
   input: {
      backgroundColor: "#161f38",
      borderRadius: 16,
      color: "#f7f9ff",
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
   },
   primaryButton: {
      backgroundColor: "#5178ee",
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 8,
   },
   primaryButtonText: {
      color: "#ffffff",
      fontWeight: "700",
      fontSize: 16,
   },
   orText: {
      color: "#7380a1",
      textAlign: "center",
      marginVertical: 18,
      fontSize: 14,
   },
   socialRow: {
      flexDirection: "column",
      gap: 12,
   },
   socialButton: {
      backgroundColor: "#ffffff",
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: "center",
   },
   socialButtonAlt: {
      backgroundColor: "#1f2842",
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: "center",
   },
   socialText: {
      color: "#111a35",
      fontWeight: "700",
      fontSize: 15,
   },
   socialTextAlt: {
      color: "#ffffff",
      fontWeight: "700",
      fontSize: 15,
   },
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 22,
   },
   footerText: {
      color: "#7a86a0",
      fontSize: 13,
   },
   footerLink: {
      color: "#d1e1ff",
   },
});
