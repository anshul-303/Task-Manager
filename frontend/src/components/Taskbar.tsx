import { useState } from "react";
import type { TaskbarProps } from "../types/types";

export default function Taskbar({ id, task, isCompleted, srNo }: TaskbarProps) {
  const [completed, setCompleted] = useState(isCompleted);

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800 border border-zinc-700 rounded-lg shadow-sm">
      <div className="flex items-center gap-6">
        <span className="text-zinc-500 font-mono text-lg">{srNo}.</span>
        <span className="text-lg text-zinc-200">{task}</span>
      </div>

      <div className="flex items-center gap-8">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            onChange={(e) => {
              setCompleted(e.target.checked);
            }}
            checked={completed}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
            readOnly
          />
          <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
            isCompleted
          </span>
        </label>

        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}
