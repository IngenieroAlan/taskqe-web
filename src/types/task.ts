export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  projectId: string;
  date?: string;
  status: TaskStatus;
  completed: boolean;
}
