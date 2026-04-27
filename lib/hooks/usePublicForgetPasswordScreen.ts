import { useState } from "react";

type SignUpResult =
   | { ok: true }
   | { ok: false; title: string; message: string };

export default function usePublicForgetPasswordScreen() {
   const [email, setEmail] = useState("");
   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleResetPassword = (): SignUpResult => {
      if (!email) {
         return {
            ok: false,
            title: "Error",
            message: "Please enter your email address.",
         };
      }
      setIsSubmitted(true);
      return { ok: true };
   };

   return { email, setEmail, isSubmitted, setIsSubmitted, handleResetPassword };
}
