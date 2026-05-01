import { Request } from "express";

export interface User {
  id: number;
  email: string;
}

export interface Task {
  id: number;
  task: string;
  isCompleted: boolean;
}

export interface HandleTaskRequest extends Request {
  userInfo?: {
    id: number;
    email: string;
  };
}
