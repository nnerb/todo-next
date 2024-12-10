"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "app/components/spinner";
import axios from "axios";
import { useCurrentSession } from "app/hooks/use-current-session";

interface Task {
  id: string ;
  title: string;
  isCompleted: boolean;
}

const Todo = () => {
  const [formData, setFormData] = useState<Task>({
    id: '',
    title: '',
    isCompleted: false
  })
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [idToEdit, setIdToEdit] = useState<string | null>(null) 
  const [isLoading, setIsLoading] = useState<boolean>()
  const [buttonLoading, setButtonLoading] = useState<boolean>()
  const { status } = useCurrentSession()


  useEffect(() => {

    const fetchTasks = async() => {
      setIsLoading(true)
      try {
        const response = await axios.get("/api/todo")
        if (!response) {
          throw new Error("Failed to fetch tasks");
        }
        setTasks(response.data)
        // console.log(response)
      } catch (error) {
        console.log("Error", error)
      } finally {
        setIsLoading(false)
      }
    }
    if (status === "authenticated") {
      fetchTasks();
    } 
  }, [status]);

  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idToEdit) {
      // Edit mode: update existing task
      setTasks((prevTasks) => (
        prevTasks.map((task) => (
          task.id === idToEdit ? { ...task, title: input } : task
        ))
      ))

      try {
        setButtonLoading(true)
        const res = await axios.patch('/api/todo', { id: idToEdit, title: input });
        if (res) {
          toast.success("Task updated successfully!");
        }
      } catch (error) {
        console.error("Failed to update task", error);
        toast.error('Failed to update');
      } finally {
        setButtonLoading(false)
      }
  
      setIdToEdit(null); // Reset edit state
    } else if (input.trim() !== "") {
      try {
        setButtonLoading(true)
        const res = await axios.post('/api/todo', {
          title: input,
        })
        if (res) {
          toast.success("Task added successfully!")
          setTasks((prevTasks) => [res.data , ...prevTasks,])
        } 
      } catch (error) {
        console.error("Failed to add task", error)
        toast.error('Failed to add')
      } finally {
        setButtonLoading(false)
      }
    }

    setInput(""); // Reset input field after adding or editing
  };

  const handleRemoveTask = async (id: string) => {
    setButtonLoading(true)
    const taskToRemove = tasks.find(task => task.id === id)
    if (!taskToRemove) return;
    try {
      const res = await axios.delete(`/api/todo/${id}`)
      if (res) {
        setTasks(tasks.filter((task) => task.id !== id))
        toast.success("Task successfully deleted")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setButtonLoading(false)
    }
    
  }

  const handleToggleTask = async (id: string) => {
   const updatedTask = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return task;
    })

    setTasks(updatedTask)

    const toggledTask = updatedTask.find(task => task.id === id)

    try {
      setButtonLoading(true)
      const res = await axios.patch("/api/todo", toggledTask)
      if (res) {
        if (toggledTask?.isCompleted) {
          toast.success("Task completed!")
        } else {
          toast.success("Task marked as incomplete!")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setButtonLoading(false)
    }
  }


  const showSignInToast = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.error("Please sign in to continue", {
      duration: 3000,
      position: "top-center",
    });
  }; 

  const handleEdit = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id)
    setInput(taskToEdit?.title || "")
    if (taskToEdit) {
      setFormData(taskToEdit)
      setIdToEdit(id)
    } 
  }

  if (status === "loading") {
    return <Spinner />
  }

  return (
    <div className="border border-gray-200 bg-gray-100 
      shadow-md mt-28 rounded-[24px] p-[3rem] w-[500px] h-full"
    >
      <h1 className="text-xl font-bold mb-5">TO DO</h1>
      <form 
        onSubmit={
          status === "authenticated" ? 
                    (handleAddTask) :
                    (showSignInToast)
        } 
        className="mb-4 flex items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="p-2 border-2 border-slate-200 rounded-md 
            outline-transparent outline outline-1
          focus:outline-blue-200 focus:-outline-offset-[2px] focus:outline-[3px]"
        />
        {idToEdit  ? (
          <div className="flex gap-1">
            <button 
              className={`py-2 px-3 bg-green-700 flex-shrink-0 
              text-white rounded-md cursor-pointer hover:bg-green-800 
              ${buttonLoading && "bg-green-800"}`}
              disabled={buttonLoading}
            >
              Save changes
            </button>
            <button 
                className={`py-2 px-3 bg-red-700 flex-shrink-0 
                text-white rounded-md cursor-pointer hover:bg-red-800 ${buttonLoading && "bg-red-800"}`}
                onClick={() => {
                  setIdToEdit(null)
                  setInput('')
                }}
                disabled={buttonLoading}
              >
                Cancel
              </button>
          </div>
         
        ) : (
          <button 
            className={`py-2 px-[0.55rem] bg-blue-700 text-white 
            rounded-md cursor-pointer hover:bg-blue-800 ml-auto flex-shrink-0 
            ${buttonLoading && "bg-blue-800"}`}
            disabled={buttonLoading}
          >
          Add Task
          </button>
        )}
       
      </form>
      <ul className="list-none p-0 w-full">
        {isLoading ? (
            <p className="text-sm text-gray-600 italic">Fetching Todos..</p>
          ) : (
            tasks.length > 0 ? (tasks.map(task => (
                <li key={task.id} className={`flex items-center mb-1 w-full`}>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggleTask(task.id)}
                    className="mr-2 border-1 border-slate-900 cursor-pointer"
                  />
                  <span 
                    className={`overflow-hidden text-ellipsis ${task.isCompleted ? "line-through text-gray-500" : ""}`}
                  >
                    {task.title}
                  </span>
                  <div className="ml-auto flex gap-1">
                    {idToEdit !== task.id && (
                      <button 
                        className={`py-2 px-3 bg-green-700 flex-shrink-0 
                        text-white rounded-md cursor-pointer hover:bg-green-800 ${buttonLoading && 
                          "bg-green-800"
                        }`}
                        onClick={() => handleEdit(task.id)}
                        disabled={buttonLoading}
                      >
                        Edit
                      </button>
                    )}
                    
                    {idToEdit !== task.id && (
                    <button 
                      className={`py-2 px-3 bg-red-700 flex-shrink-0 
                      text-white rounded-md cursor-pointer hover:bg-red-800 
                      ${buttonLoading && "bg-red-800"}`}
                      onClick={() => handleRemoveTask(task.id)}
                      disabled={buttonLoading}
                    >
                      Remove
                    </button>
                    )}
                  
                  </div>
                </li>
            ))) : (
              <>
              {status === "authenticated" && <p className="text-sm text-gray-600 italic">Currently no tasks..</p>}
              {status === "unauthenticated" && <p className="text-sm text-gray-600 italic">Sign in to get started.</p>}
              </>
            )
          )
        }
      </ul>
    </div>
  );
}

export default Todo;
