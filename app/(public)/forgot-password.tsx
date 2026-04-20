import {
   Button,
   Card,
   FooterRow,
   Input,
   Label,
   Link,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import theme from "@/theme";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function ForgotPassword() {
   const [email, setEmail] = useState("");
   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleResetPassword = () => {
      if (!email) {
         Alert.alert("Error", "Please enter your email address.");
         return;
      }
      setIsSubmitted(true);
      Alert.alert(
         "Reset Link Sent",
         `A password reset link has been sent to ${email}`,
      );
   };

   if (isSubmitted) {
      return (
         <Screen>
            <Card>
               <Title>Check Your Email</Title>
               <Subtitle>
                  We've sent a password reset link to {email}. Please check your
                  email and follow the instructions to reset your password.
               </Subtitle>

               {/* <View style={styles.linkRow}>
                  <FooterText>Didn't receive the email?</FooterText>
                  <Button onPress={() => setIsSubmitted(false)}>Try again</Button>
               </View> */}

               <FooterRow>
                  <Link href="/">Sign in</Link>
                  <Link href="/signup">Create account</Link>
               </FooterRow>
            </Card>
         </Screen>
      );
   }

   return (
      <Screen>
         <Card>
            <Title>Reset Password</Title>
            <Subtitle>
               Enter the email address associated with your account and we'll
               send you a link to reset your password.
            </Subtitle>

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

            <Button
               title="Send Reset Link"
               onPress={handleResetPassword}
            />
         </Card>
      </Screen>
   );
}

const styles = StyleSheet.create({
   inputGroup: {
      marginBottom: theme.spacing.marginBottomInputGroup,
   },
   linkRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: theme.spacing.marginTopFooter,
   },
});
