"use client"

import Spinner from "app/components/spinner";
import { RegisterProps } from "app/constants";
import { checkPasswordStrength } from "app/utils/password";
import axios from "axios";
import { getUserByEmail } from "data/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {

  const router = useRouter()

  const [formValues, setFormValues] = useState<RegisterProps>({
    name: '',
    email: '',
    password: ''
  })
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>()

  const { data: session, status } = useSession()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value))
    }
  }
  
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const existingUser = await getUserByEmail(formValues.email);
      console.log(formValues)
      if (existingUser) {
        toast.error("User with this email already exists");
      } else {
        const res = await axios.post("/api/register", formValues)
        if (res) {
          toast.success('Registered successfully!')
          router.push('/sign-in')
        }
      }
      console.log(formValues)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return <Spinner />
  }

  return (
    <main className="min-h-screen w-full bg-gray-200 flex justify-center items-center">
      <div className="p-10 overflow-hidden h-[467px] w-[400px]">
        <form className="border border-1 border-gray-200 
          shadow-md flex flex-col gap-2 py-8 px-10 rounded-xl bg-gray-100"
        >
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold text-center">Register</p>
            <div>
              <span className="text-sm font-semibold ml-[0.1rem]">Name </span>
              <span className="text-xs font-semibold text-gray-600">(optional)</span>
              <input 
                type="text" 
                name="name"
                placeholder="John Doe"
                value={formValues.name}
                onChange={handleOnChange}
                className="border w-full text-sm border-1 px-3 py-[0.4rem]
                border-gray-900 bg-gray-100 rounded-md"
              />
            </div>
            <div>
            <span className="text-sm font-semibold ml-[0.1rem]">Email </span>
              <input 
                type="text" 
                name="email"
                required
                placeholder="johndoe@mail.com"
                value={formValues.email}
                onChange={handleOnChange}
                className="border w-full text-sm border-1 px-3 py-[0.4rem] border-gray-900 bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <div className="relative">
                <span className="text-sm font-semibold ml-[0.1rem]">Password </span>
                <input 
                  type={isPasswordShow ? "" : "password"}
                  name="password"
                  value={formValues.password}
                  onChange={handleOnChange}
                  className="border w-full text-sm border-1 pl-3 pr-7 py-[0.4rem] bg-gray-100 border-gray-900 rounded-md"
                  />
                <div 
                  className="absolute right-[8px] bottom-[9px] cursor-pointer" 
                  onClick={() => setIsPasswordShow(prevStatus => !prevStatus)}>
                  {isPasswordShow ? (
                    <FaEye/> 
                  ) : (
                    <FaEyeSlash />
                  )}
                </div>
              </div>
                {formValues.password && (
                  <div className="mt-2 text-sm">
                    <p
                      className={`${
                        passwordStrength === "Weak"
                          ? "text-red-500"
                          : passwordStrength === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      Password Strength: {passwordStrength}
                    </p>
                  </div>
                )}
            </div>
            <button 
              disabled={(passwordStrength === "Weak" || !formValues.password) && true}
              className={`w-full text-white px-3 py-1 bg-blue-400 
                rounded-md hover:bg-blue-500 transition duration-300
                ${(passwordStrength === "Weak" || !formValues.password) ? 
                "cursor-not-allowed pointer-events-none" :
                "cursor-pointer pointer-events-auto"}`}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          <div className="text-sm flex gap-1">
          <p className="text-gray-500">Have an account?</p>
          <Link href="/sign-in" className="font-semibold">Sign in</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
