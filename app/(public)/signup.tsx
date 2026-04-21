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
import { useAuth } from "@/context/AuthContext";
import { validateSignUpForm } from "@/lib/validation/signup";
import { useState } from "react";
import { Alert } from "react-native";

export default function SignUp() {
   const { signup } = useAuth();
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const handleSignUp = async () => {
      const result = validateSignUpForm(form);
      if (!result.isValid) {
         Alert.alert("Error", result.error);
         return;
      }

      try {
         await signup(result.value.name, result.value.email, result.value.password);
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         Alert.alert("Sign Up Failed", message);
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
               value={form.name}
               onChangeText={(name) => setForm((prev) => ({ ...prev, name }))}
            />

            <InputGroup
               label="Email"
               placeholder="you@example.com"
               keyboardType="email-address"
               autoCapitalize="none"
               value={form.email}
               onChangeText={(email) => setForm((prev) => ({ ...prev, email }))}
            />

            <InputGroup
               label="Password"
               placeholder="Create a password"
               secureTextEntry
               value={form.password}
               onChangeText={(password) =>
                  setForm((prev) => ({ ...prev, password }))
               }
            />

            <InputGroup
               label="Confirm Password"
               placeholder="Confirm your password"
               secureTextEntry
               value={form.confirmPassword}
               onChangeText={(confirmPassword) =>
                  setForm((prev) => ({ ...prev, confirmPassword }))
               }
            />

            <Button
               title="Sign up"
               onPress={handleSignUp}
            />

            <FooterRow>
               <FooterText>Already have an account?</FooterText>
               <Link href="/">Sign in</Link>
            </FooterRow>
         </Card>
      </Screen>
   );
}
