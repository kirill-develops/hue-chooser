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
import { usePublicSignInScreen } from "@/lib/hooks/usePublicSignInScreen";
import { Alert } from "react-native";

export default function Index() {
   const {
      form,
      handleFormUpdate,
      handleGoogleSignIn,
      handleAppleSignIn,
      handleEmailSignIn,
   } = usePublicSignInScreen();

   const handleSignInPress = async () => {
      const result = await handleEmailSignIn();
      if (!result.ok) {
         Alert.alert(result.title, result.message);
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
               placeholder="Enter your password"
               textContentType="password"
               autoComplete="password"
               autoCapitalize="none"
               autoCorrect={false}
               value={form.password}
               onChangeText={handleFormUpdate("password")}
            />
            <Button
               title="Sign in"
               onPress={handleSignInPress}
            />
            <OrText>or continue with</OrText>

            <CardRow variant="column">
               <Button
                  title="Sign in with Google"
                  onPress={handleGoogleSignIn}
                  variant="social"
               />
               <Button
                  title="Sign in with Apple"
                  onPress={handleAppleSignIn}
                  variant="socialAlt"
               />
            </CardRow>
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
