import {
   Button,
   Card,
   FooterText,
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
   const { session, login, logout } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSignIn = () => {
      if (!!email && !!password) {
         login(email);
      } else {
         Alert.alert("Error", "Please enter both email and password.");
      }
   };

   const handleSignOut = () => {
      logout();
   };

   return (
      <Screen>
         <Card>
            <Title>Welcome back</Title>
            <Subtitle>
               {session
                  ? `Welcome back, ${session.user.email}!`
                  : "Sign in to continue to Hue Chooser."}
            </Subtitle>

            {!session && (
               <>
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
               </>
            )}

            {!!session && (
               <View style={styles.socialRow}>
                  <View style={styles.dashboardRow}>
                     <Link href="/profile">Go to Dashboard</Link>
                  </View>
                  <Button
                     title="Sign out"
                     onPress={handleSignOut}
                     variant="secondary"
                  />
               </View>
            )}

            <View style={styles.footerRow}>
               <FooterText>Forgot password?</FooterText>
               <Link href="/about">Create account</Link>
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
      marginBottom: theme.spacing.marginVerticalOr,
   },
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.marginTopFooter,
   },
});
