import { useEffect, useState } from "react";
import Taskbar from "../components/Taskbar";

import type { Task } from "../types/types";

import { LogoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { addTask, fetchAllTasks } from "../api/handleTasks";

export default function Tasks() {
  const [currentTask, setCurrentTask] = useState("");

  useEffect(() => {
    const callFetchAllTasks = async (): Promise<void> => {
      const data = await fetchAllTasks();
      setTasks(data.rows);
    };
    callFetchAllTasks();
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex flex-col items-center p-8 font-sans">
      {/* Top Navigation / Action Bar */}
      <div className="w-full max-w-4xl flex items-center gap-4 mb-12">
        <input
          type="text"
          value={currentTask}
          onChange={(e) => {
            setCurrentTask(e.target.value);
          }}
          placeholder="Enter a new task..."
          className="flex-1 p-3 rounded-md bg-white text-zinc-900 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={async () => {
            const data = await addTask(currentTask);
            console.log(data.rows);
            setTasks(data.rows);
            setCurrentTask("");
          }}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-md hover:opacity-90 transition-opacity  transition-transform active:scale-150 duration-400"
        >
          Submit
        </button>
        <button
          onClick={async () => {
            try {
              await LogoutUser();
              navigate("/login");
            } catch (error) {
              console.log("Error occured :", error);
            }
          }}
          className="px-6 py-3 bg-black border border-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-800 transition-transform active:scale-150 duration-400"
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 tracking-tight">Tasks</h1>

      <div className="w-full max-w-4xl space-y-4">
        {tasks.map((element, index) => (
          <Taskbar
            key={element.id}
            id={element.id}
            srNo={index + 1}
            task={element.task}
            completed={element.completed}
            setTasks={setTasks}
          />
        ))}
      </div>
    </div>
  );
}
