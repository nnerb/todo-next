"use client"

import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [sum, setSum] = useState<number>(0);

  const handleFirstInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setNum1(value);
      calculateSum(value, num2);
    }
  };

  const handleSecondInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setNum2(value);
      calculateSum(num1, value);
    }
  };

  const calculateSum = (num1: string, num2: string) => {
    const value1 = num1 === '' ? 0 : parseFloat(num1);
    const value2 = num2 === '' ? 0 : parseFloat(num2);
    const total = value1 + value2;
    setSum(total);
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setSum(0);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center border border-gray-700 rounded-2xl p-12 gap-1">
        <h1 className="text-2xl font-bold mb-4">Calculator</h1>
        <input 
          type="text" 
          inputMode="numeric" 
          pattern="[0-9]*" 
          className="p-2 border-2 border-gray-300 rounded-md text-2xl focus:outline-none focus:border-blue-500"
          value={num1} 
          onChange={handleFirstInput} 
          placeholder="0" 
        />
        <input 
          type="text" 
          inputMode="numeric" 
          pattern="[0-9]*" 
          className="p-2 border-2 border-gray-300 rounded-md text-2xl focus:outline-none focus:border-blue-500"
          value={num2} 
          onChange={handleSecondInput} 
          placeholder="0" 
        />
        <div className="text-lg mt-2">
          Total: {sum}
        </div>
        <button 
          className="w-full py-2 px-4 text-white rounded-md bg-red-600 hover:bg-red-500" 
          onClick={handleReset}
        >
            Reset
        </button>
      </div>
    </div>
  );
};

export default Calculator;
