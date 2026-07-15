import type { Task } from "../types/task";
import defaultTasks from "../data/tasks.json";

const STORAGE_KEY = "taskqe-tasks";

export function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Task[];
    }
  } catch {
    // fallback to defaults
  }
  return [...defaultTasks];
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function generateTaskId(): string {
  return `tq-${Date.now().toString().slice(-6)}`;
}
