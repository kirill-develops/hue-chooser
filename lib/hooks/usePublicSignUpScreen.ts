import { useAuth } from "@/context/AuthContext";
import { validateSignUpForm } from "@/lib/validation/signup";
import { useState } from "react";

type SignUpForm = {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
};

type SignUpResult =
   | { ok: true }
   | { ok: false; title: string; message: string };

export function usePublicSignUpScreen() {
   const { signup } = useAuth();
   const [form, setForm] = useState<SignUpForm>({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const handleFormUpdate = (field: keyof SignUpForm) => (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
   };

   const handleSignUp = async (): Promise<SignUpResult> => {
      const result = validateSignUpForm(form);
      if (!result.isValid) {
         return { ok: false, title: "Sign Up Failed", message: result.error };
      }

      try {
         await signup(
            result.value.name,
            result.value.email,
            result.value.password,
         );
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
      handleSignUp,
   };
}
