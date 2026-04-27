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
import { usePublicSignUpScreen } from "@/lib/hooks/usePublicSignUpScreen";
import { Alert } from "react-native";

export default function SignUp() {
   const { form, handleFormUpdate, handleSignUp } = usePublicSignUpScreen();

   const handleSignUpPress = async () => {
      const result = await handleSignUp();
      if (!result.ok) {
         Alert.alert(result.title, result.message);
      }
   };
   return (
      <Screen>
         <Card>
            <Title>Create Account</Title>
            <Subtitle>Sign up to start using Hue Chooser.</Subtitle>
            <InputGroup
               label="Name"
               placeholder="Your full name"
               textContentType="name"
               autoComplete="name"
               autoCorrect={false}
               value={form.name}
               onChangeText={handleFormUpdate("name")}
            />
            <InputGroup
               label="Email"
               placeholder="you@example.com"
               textContentType="emailAddress"
               autoComplete="email"
               keyboardType="email-address"
               autoCapitalize="none"
               autoCorrect={false}
               value={form.email}
               onChangeText={handleFormUpdate("email")}
            />
            <InputGroup
               label="Password"
               placeholder="Create a password"
               textContentType="newPassword"
               autoComplete="new-password"
               autoCapitalize="none"
               autoCorrect={false}
               value={form.password}
               onChangeText={handleFormUpdate("password")}
            />
            <InputGroup
               label="Confirm Password"
               placeholder="Confirm your password"
               textContentType="password"
               autoComplete="password"
               autoCapitalize="none"
               autoCorrect={false}
               value={form.confirmPassword}
               onChangeText={handleFormUpdate("confirmPassword")}
            />
            <Button
               title="Sign up"
               onPress={handleSignUpPress}
            />
            <FooterRow>
               <FooterText>Already have an account?</FooterText>
               <Link
                  href="/"
                  dismissTo
               >
                  Sign in
               </Link>
            </FooterRow>
         </Card>
      </Screen>
   );
}
