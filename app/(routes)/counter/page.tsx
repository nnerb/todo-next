"use client"

import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0)

  const increment = () => setCounter((prevValue) => prevValue + 1)
  const decrement = () => {
    setCounter((prevValue) => {
      if (prevValue > 0) {
        return  prevValue - 1
      }
      return prevValue
    })
  }

  const reset = () => setCounter(0);

  const isEven = counter % 2 === 0 ? "EVEN" : "ODD"

  return ( 
    <div className="min-h-screen w-full grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-4 border border-slate-950 rounded-xl p-6 w-[200px]">
        <div>
          <span>Value:</span>
          <span className="ml-1 font-bold">{counter}</span>
        </div>
        <div>
          <span>The value is:</span>
          <span className="ml-1 font-bold">{isEven}</span>
        </div>
        
        <div className="flex flex-col gap-4 text-white items-center">
          <div className="flex gap-4">
            <button
              className="border py-[3px] px-5 rounded-md bg-red-700
              hover:bg-red-800 transition duration-300"
              onClick={decrement}
            >
              -
            </button>
            <button
              className="border py-[3px] px-5 rounded-md bg-blue-700 
              hover:bg-blue-800 transition duration-300"
              onClick={increment}
            >
              +
            </button>
          </div>
          <div className="w-full">
            <button 
              onClick={reset}
              className="bg-gray-700 w-full hover:bg-gray-800 duration-300 
              transition rounded-md py-[3px] px-5 font-bold"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Counter;