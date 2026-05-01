export interface Task {
  id: number;
  task: string;
  isCompleted: boolean;
}

export interface TaskbarProps extends Task {
  srNo: number;
}
