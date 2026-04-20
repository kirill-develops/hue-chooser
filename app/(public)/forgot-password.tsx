import {
   Button,
   Card,
   FooterRow,
   InputGroup,
   Link,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import { useState } from "react";
import { Alert } from "react-native";

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

            <InputGroup
               label="Email"
               placeholder="you@example.com"
               keyboardType="email-address"
               autoCapitalize="none"
               value={email}
               onChangeText={setEmail}
            />

            <Button
               title="Send Reset Link"
               onPress={handleResetPassword}
            />
         </Card>
      </Screen>
   );
}
