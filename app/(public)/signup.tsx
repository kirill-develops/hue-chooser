import {
   Button,
   Card,
   FooterRow,
   FooterText,
   InputGroup,
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

            <InputGroup
               label="Name"
               placeholder="Your full name"
               value={name}
               onChangeText={setName}
            />

            <InputGroup
               label="Email"
               placeholder="you@example.com"
               keyboardType="email-address"
               autoCapitalize="none"
               value={email}
               onChangeText={setEmail}
            />

            <InputGroup
               label="Password"
               placeholder="Create a password"
               secureTextEntry
               value={password}
               onChangeText={setPassword}
            />

            <InputGroup
               label="Confirm Password"
               placeholder="Confirm your password"
               secureTextEntry
               value={confirmPassword}
               onChangeText={setConfirmPassword}
            />

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
   socialRow: {
      flexDirection: "column",
      gap: theme.spacing.gapSocialRow,
   },
   dashboardRow: {
      alignItems: "center",
      marginVertical: theme.spacing.marginVerticalOr,
   },
});
