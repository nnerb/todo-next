"use server"

import { prisma } from "app/lib/prisma"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch (error) {
    console.log("Error fetching email", error)
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}