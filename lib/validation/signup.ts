export type SignUpForm = {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
};

type SignUpValidationResult =
   | {
        isValid: true;
        value: { name: string; email: string; password: string };
     }
   | {
        isValid: false;
        error: string;
     };

export function validateSignUpForm(form: SignUpForm): SignUpValidationResult {
   const trimmedName = form.name.trim();
   const trimmedEmail = form.email.trim();
   const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!trimmedName || !trimmedEmail || !form.password || !form.confirmPassword) {
      return { isValid: false, error: "Please fill in all fields." };
   }

   if (!namePattern.test(trimmedName)) {
      return { isValid: false, error: "Please enter your real first and last name." };
   }

   if (!emailPattern.test(trimmedEmail)) {
      return { isValid: false, error: "Please enter a valid email address." };
   }

   if (form.password.length < 6) {
      return { isValid: false, error: "Password must be at least 6 characters long." };
   }

   if (form.password !== form.confirmPassword) {
      return { isValid: false, error: "Passwords do not match." };
   }

   return {
      isValid: true,
      value: {
         name: trimmedName,
         email: trimmedEmail,
         password: form.password,
      },
   };
}
