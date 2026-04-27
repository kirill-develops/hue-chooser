import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type SignInForm = {
   email: string;
   password: string;
};

type SignInResult =
   | { ok: true }
   | { ok: false; title: string; message: string };

export function usePublicSignInScreen() {
   const { login } = useAuth();
   const [form, setForm] = useState<SignInForm>({
      email: "",
      password: "",
   });

   const handleFormUpdate = (field: keyof SignInForm) => (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
   };

   const handleGoogleSignIn = () => {};
   const handleAppleSignIn = () => {};

   const handleEmailSignIn = async (): Promise<SignInResult> => {
      if (!form.email || !form.password) {
         return {
            ok: false,
            title: "Error",
            message: "Please enter both email and password.",
         };
      }

      try {
         await login(form.email, form.password);
         return { ok: true };
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         return {
            ok: false,
            title: "Login Failed",
            message,
         };
      }
   };

   return {
      form,
      handleFormUpdate,
      handleGoogleSignIn,
      handleAppleSignIn,
      handleEmailSignIn,
   };
}
