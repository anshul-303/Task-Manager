export interface Task {
  id: string;
  task: string;
  completed: boolean;
}

export interface TaskbarProps extends Task {
  srNo: number;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
