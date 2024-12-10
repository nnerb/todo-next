import { checkPasswordStrength } from "app/utils/password";
import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters" })
    .refine(
      (password) => checkPasswordStrength(password) === 'Strong',
      { message: "Password must be strong (e.g., 10+ characters, uppercase, lowercase, number, and special character)" }
    ),
});