import {
   Button,
   Card,
   FooterRow,
   FooterText,
   Input,
   Label,
   Link,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import { useAuth } from "@/context/AuthContext";
import theme from "@/theme";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function SignUp() {
   const { signup } = useAuth();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleSignUp = () => {
      if (!name || !email || !password || !confirmPassword) {
         Alert.alert("Error", "Please fill in all fields.");
         return;
      }
      if (password !== confirmPassword) {
         Alert.alert("Error", "Passwords do not match.");
         return;
      }
      signup(name, email, password);
   };

   return (
      <Screen>
         <Card>
            <Title>Create Account</Title>
            <Subtitle>Sign up to start using Hue Chooser.</Subtitle>

            <View style={styles.inputGroup}>
               <Label>Name</Label>
               <Input
                  placeholder="Your full name"
                  value={name}
                  onChangeText={setName}
               />
            </View>

            <View style={styles.inputGroup}>
               <Label>Email</Label>
               <Input
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
               />
            </View>

            <View style={styles.inputGroup}>
               <Label>Password</Label>
               <Input
                  placeholder="Create a password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
               />
            </View>

            <View style={styles.inputGroup}>
               <Label>Confirm Password</Label>
               <Input
                  placeholder="Confirm your password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
               />
            </View>

            <Button
               title="Sign up"
               onPress={handleSignUp}
            />

            <View style={styles.dashboardRow}>
               <Link href="/about">About Hue Chooser</Link>
            </View>

            <FooterRow>
               <FooterText>Already have an account?</FooterText>
               <Link href="/">Sign in</Link>
            </FooterRow>
         </Card>
      </Screen>
   );
}

const styles = StyleSheet.create({
   inputGroup: {
      marginBottom: theme.spacing.marginBottomInputGroup,
   },
   socialRow: {
      flexDirection: "column",
      gap: theme.spacing.gapSocialRow,
   },
   dashboardRow: {
      alignItems: "center",
      marginVertical: theme.spacing.marginVerticalOr,
   },
});
