import Taskbar from "../components/TaskBar";

export default function Tasks() {
  // Mock data for the 5 bars
  const mockTasks = [
    { id: 1, task: "Complete the PERN stack dashboard", completed: false },
    { id: 2, task: "Practice C++ STL for Codeforces", completed: true },
    { id: 3, task: "Study for CAT Logical Reasoning", completed: false },
    { id: 4, task: "Fix JWT cookie sameSite issues", completed: true },
    { id: 5, task: "Review Docker microservices architecture", completed: false },
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex flex-col items-center p-8 font-sans">
      
      {/* Top Navigation / Action Bar */}
      <div className="w-full max-w-4xl flex items-center gap-4 mb-12">
        <input 
          type="text" 
          placeholder="Enter a new task..." 
          className="flex-1 p-3 rounded-md bg-white text-zinc-900 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-md hover:opacity-90 transition-opacity  transition-transform active:scale-150 duration-400">
          Submit
        </button>
        <button className="px-6 py-3 bg-black border border-zinc-700 text-white font-semibold rounded-md hover:bg-zinc-800 transition-transform active:scale-150 duration-400">
          Logout
        </button>
      </div>

      {/* Centered Heading */}
      <h1 className="text-4xl font-bold mb-8 tracking-tight">Tasks</h1>

      {/* Tasks List */}
      <div className="w-full max-w-4xl space-y-4">
        {mockTasks.map((item, index) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-4 bg-zinc-800 border border-zinc-700 rounded-lg shadow-sm"
          >
            {/* Left Section: Sr. No & Task Name */}
            <div className="flex items-center gap-6">
              <span className="text-zinc-500 font-mono text-lg">{index + 1}.</span>
              <span className="text-lg text-zinc-200">{item.task}</span>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={item.completed}
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
        ))}
        {/* <Taskbar/> */}
      </div>
    </div>
  );
}