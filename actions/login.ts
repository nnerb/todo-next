"use server"

import { signIn } from "auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "app/schemas"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields"}
  }

  const { email, password } = validatedFields.data 

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" }
        default: 
          return { error: "Something went wrong" }
      }
    }
    throw error
  }
}
