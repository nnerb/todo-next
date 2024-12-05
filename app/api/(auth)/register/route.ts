import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "app/lib/prisma";
import * as z from 'zod'
import { checkPasswordStrength } from "app/utils/password";
import { getUserByEmail } from "actions/user";


const userSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().min(1, 'Email is required').max(100).email('Invalid email'),
  password: z.string().refine((password) => {
    const strength = checkPasswordStrength(password);
    return strength === 'Strong' || strength === 'Medium';
}, {
    message: 'Password must be at least 6 characters long and contain a mix of uppercase, lowercase, numbers, and special characters.',
  }),
})


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      name,
      password
    } = userSchema.parse(body)

  if (!email || !name || !password) {
    return new NextResponse('Missing info', { status: 400 });
  }

  const existingUserByEmail = await getUserByEmail(email)


  if (existingUserByEmail) {
    return NextResponse.json({ user: null, message: "User with this email already exists" })
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

return NextResponse.json(user);

  } catch (error) {
    console.log('[TODO_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}