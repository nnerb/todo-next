"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return ( 
    <div className="fixed top-0 w-full bg-blue-500 text-slate-200">
      <div className="py-4 px-3 flex items-center max-w-[1150px] justify-center mx-auto">
        <div>Welcome {session?.user?.name || 'Guest'}!</div>
        <div className="ml-auto">
            <button 
              onClick={() => {
                if (status === "authenticated") {
                  signOut(); // Sign out user if authenticated
                } else if (status === "unauthenticated") {
                  router.push("/sign-in"); // Redirect to sign-in if unauthenticated
                }
              }} 
              className={`
                rounded-md py-2 px-3  hover:bg-blue-900 duration-300
                ${status === "loading" ? "bg-blue-900" : "bg-blue-800"}
              `}
              type="button" 
              disabled={status === "loading" ? true : false}
            >
              {status === "authenticated" && "Sign out"}
              {status === "unauthenticated" && "Sign in"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
