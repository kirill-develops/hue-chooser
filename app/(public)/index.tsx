import {
   Button,
   Card,
   Input,
   Label,
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

   const handleSignIn = () => {
      if (!!email && !!password) {
         login(email);
      } else {
         Alert.alert("Error", "Please enter both email and password.");
      }
   };

   return (
      <Screen>
         <Card>
            <Title>Welcome back</Title>
            <Subtitle>Sign in to continue to Hue Chooser.</Subtitle>

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
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
               />
            </View>

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

            <View style={styles.dashboardRow}>
               <Link href="/about">About Hue Chooser</Link>
            </View>

            <View style={styles.footerRow}>
               <Link href="/forgot-password">Forgot password?</Link>
               <Link href="/signup">Create account</Link>
            </View>
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
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.marginTopFooter,
   },
});
