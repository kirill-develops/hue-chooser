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
import theme from "@/theme";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

type User = {
   email: string;
};

export default function Index() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [user, setUser] = useState<User | null>(null);

   const handleSignIn = () => {
      if (!!email && !!password) {
         Alert.alert("Sign In", `Email: ${email}\nPassword: ${password}`);
         setUser({ email });
      } else {
         Alert.alert("Error", "Please enter both email and password.");
         return;
      }
   };

   const handleSignOut = () => {
      setUser(null);
   };

   return (
      <Screen>
         <Card>
            <Title>Welcome back</Title>
            <Subtitle>
               {user
                  ? `Welcome back, ${user.email}!`
                  : "Sign in to continue to Hue Chooser."}
            </Subtitle>

            {!user && (
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

            {!!user && (
               <View style={styles.socialRow}>
                  <Link href="/profile">Go to Dashboard</Link>

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
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.marginTopFooter,
   },
});
