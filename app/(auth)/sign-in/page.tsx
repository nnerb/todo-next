"use client"

import { login } from "actions/login";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignInProps {
  email: string;
  password: string;
}

export default function SignIn() {

  const [formValues, setFormValues] = useState<SignInProps>({
    email: '',
    password: ''
  })

  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const router = useRouter()
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await login(formValues)
      if (data?.error) {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false); 
    }
  };


  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-200">
      <div className="p-10 w-[450px] overflow-hidden">
        <form 
          className="border border-1 shadow-md border-gray-200 
          flex flex-col gap-2 py-8 px-10 rounded-xl bg-gray-100"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold text-center">Sign in</p>
            <div>
              <p className="text-sm font-semibold ml-[0.1rem]">Email </p>
              <input 
                type="text" 
                name="email"
                required
                disabled={isLoading}
                placeholder="johndoe@mail.com"
                value={formValues.email}
                onChange={handleOnChange}
                className="border w-full text-sm border-1 px-3 py-[0.4rem] border-gray-900 bg-gray-100 rounded-md"
              />
            </div>
            <div className="relative">
              <span className="text-sm font-semibold ml-[0.1rem]">Password</span>
              <input 
                type={isPasswordShow ? "" : "password"} 
                name="password"
                required
                disabled={isLoading}
                value={formValues.password}
                onChange={handleOnChange}
                className="
                  border w-full text-sm border-1 
                  px-3 py-[0.4rem] bg-gray-100 border-gray-900 rounded-md
                "
              />
              <div 
                className="absolute right-[8px] bottom-[8px] cursor-pointer" 
                onClick={() => setIsPasswordShow(prevStatus => !prevStatus)}>
                {
                  isPasswordShow 
                  ? <FaEye/> 
                  : <FaEyeSlash />
                }
              </div>
           </div>
            <button 
              disabled={isLoading}
              className={`
                w-full text-white px-3 py-1 rounded-md transition duration-300
                ${isLoading 
                  ? "bg-blue-300 cursor-not-allowed" 
                  : "bg-blue-400 hover:bg-blue-500"
                }
              `}
            >
              Sign in
            </button>
          </div>
          <div className="text-sm flex gap-1">
           <p className="text-gray-500">Don't have an account?</p>
           <Link href="/register" className="font-semibold">Register</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
