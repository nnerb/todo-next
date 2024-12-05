"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Todos = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    }))
  }

  return (
    <div className="flex justify-center items-center mt-20 pb-10 px-10 overflow-hidden">
      <div className="border border-gray-600 rounded-[24px] p-[3rem] w-[500px]">
        <h1 className="text-xl font-bold mb-5">TO DO</h1>
        <form onSubmit={handleAddTask} className="mb-4 flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="p-2 border border-slate-900 rounded-md "
          />
          <button 
            className="py-2 px-[0.55rem] bg-blue-700 text-white 
            rounded-md cursor-pointer hover:bg-blue-800 ml-auto flex-shrink-0"
          >
            Add Task
          </button>
        </form>
        <ul className="list-none p-0 w-full">
          {tasks.map(task => (
            <li key={task.id} className={`flex items-center mb-1 w-full`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="mr-2 border-1 border-slate-900 "
              />
              <span className={`overflow-hidden text-ellipsis ${task.completed ? "line-through" : ""}`}>{task.text}</span>
              <button 
                className="ml-auto py-2 px-3 bg-red-700 flex-shrink-0 
                text-white rounded-md cursor-pointer hover:bg-red-800"
                onClick={() => handleRemoveTask(task.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
