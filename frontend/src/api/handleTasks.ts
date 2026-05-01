const URL = import.meta.env.VITE_APP_API_URL;
import type { Task } from "../types/types";

export async function fetchAllTasks(): Promise<{
  message: string;
  rows: Task[];
}> {
  const res = await fetch(`${URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "GET",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  console.log(data.message);
  return data;
}

export async function addTask(
  task: string,
): Promise<{ message: string; rows: Task[] }> {
  const res = await fetch(`${URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ task: task }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteTask(
  id: string,
): Promise<{ message: string; rows: Task[] }> {
  const res = await fetch(`${URL}/tasks/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  //   console.log(data.message);
  return data;
}
