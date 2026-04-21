import { InputGroup } from "@/components/";
import {
   Button,
   Card,
   CardRow,
   FooterRow,
   Link,
   OrText,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import { useAuth } from "@/context/AuthContext";
import theme from "@/theme";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Index() {
   const { login } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSignIn = async () => {
      if (!email || !password) {
         Alert.alert("Error", "Please enter both email and password.");
         return;
      } else {
         try {
            await login(email);
         } catch (error) {
            const message =
               error instanceof Error ? error.message : "Please try again.";
            Alert.alert("Login Failed", message);
         }
      }
   };

   return (
      <Screen>
         <Card>
            <Title>Welcome back</Title>
            <Subtitle>Sign in to continue to Hue Chooser.</Subtitle>
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
               placeholder="Enter your password"
               secureTextEntry
               value={password}
               onChangeText={setPassword}
            />
            <Button
               title="Sign in"
               onPress={handleSignIn}
            />
            <OrText>or continue with</OrText>

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
            <CardRow>
               <Link href="/about">About Hue Chooser</Link>
            </CardRow>
            <FooterRow>
               <Link href="/forgot-password">Forgot password?</Link>
               <Link href="/signup">Create account</Link>
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
});
