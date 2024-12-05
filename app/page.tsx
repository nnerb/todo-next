"use client"

import Navbar from "app/components/navbar";
import Todo from "app/components/todo";
import Spinner from "./components/spinner";
import { useCurrentSession } from "./hooks/use-current-session";


export default function Home() {

  // const { status } = useCurrentSession()

  // if (status === 'loading') {
  //   return (
  //     <div className="min-h-screen w-full flex justify-center items-center bg-gray-200">
  //       <Spinner />
  //     </div>
  //   );
  // }
  
  return ( 
    <div className="min-h-screen w-full flex justify-center pb-10 px-10 overflow-hidden bg-gray-200">
      <Navbar />
      <Todo/>
    </div>
  );
}
 
