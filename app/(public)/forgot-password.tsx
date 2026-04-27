import { InputGroup } from "@/components/";
import {
   Button,
   Card,
   FooterRow,
   FooterText,
   Link,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import usePublicForgetPasswordScreen from "@/lib/hooks/usePublicForgetPasswordScreen";

import { Alert } from "react-native";

export default function ForgotPassword() {
   const { email, setEmail, isSubmitted, setIsSubmitted, handleResetPassword } =
      usePublicForgetPasswordScreen();

   const handleResetPasswordPress = async () => {
      const result = handleResetPassword();
      if (!result.ok) {
         Alert.alert(result.title, result.message);
      } else {
         Alert.alert(
            "Reset Link Sent",
            `A password reset link has been sent to ${email}`,
         );
      }
   };

   if (isSubmitted) {
      return (
         <Screen>
            <Card>
               <Title>Check Your Email</Title>
               <Subtitle>
                  We&#39;ve sent a password reset link to {email}. Please check
                  your email and follow the instructions to reset your password.
               </Subtitle>

               <FooterRow>
                  <FooterText>Didn&#39;t receive the email?</FooterText>
                  <Button
                     title="Try again"
                     variant="link"
                     onPress={() => setIsSubmitted(false)}
                  />
               </FooterRow>

               <FooterRow variant="end">
                  <Link href="/">Sign in</Link>
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
               Enter the email address associated with your account and
               we&#39;ll send you a link to reset your password.
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
               onPress={handleResetPasswordPress}
            />
            <FooterRow variant="end">
               <Link
                  href="/"
                  dismissTo
               >
                  Sign In
               </Link>
            </FooterRow>
         </Card>
      </Screen>
   );
}
