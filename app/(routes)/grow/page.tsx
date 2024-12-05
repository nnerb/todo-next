"use client"

import { useState } from "react";

const Grow = () => {
  const [size, setSize] = useState(100)
  const [color, setColor] = useState('')

  const handleClick = () => {
    setSize(size * 2);
    setColor(getRandomColor());
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color
  }
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        className="border border-1 rounded-md border-slate-900"
        style={{ width: size, height: size, backgroundColor: color }}
        onClick={handleClick}
      >
        GROW
      </button>
    </div>
  )
}
 
export default Grow;