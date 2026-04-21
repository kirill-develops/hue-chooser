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
   const namePattern = /^[A-Za-z]+(?:[-'][A-Za-z]+)*$/;
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return { isValid: false, error: "Please fill in all fields." };
   }

   if (
      /\s/.test(form.name) ||
      /\s/.test(form.email) ||
      /\s/.test(form.password) ||
      /\s/.test(form.confirmPassword)
   ) {
      return { isValid: false, error: "Spaces are not allowed in these fields." };
   }

   if (!namePattern.test(form.name)) {
      return { isValid: false, error: "Please enter a valid name without spaces." };
   }

   if (!emailPattern.test(form.email)) {
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
         name: form.name,
         email: form.email,
         password: form.password,
      },
   };
}
