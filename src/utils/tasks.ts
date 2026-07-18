import type { Task } from "../types/task";
import defaultTasks from "../data/tasks.json";

const STORAGE_KEY = "taskqe-tasks";

export function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Task[];
      return parsed.map((t) => ({
        ...t,
        important: t.important ?? false,
      }));
    }
  } catch {
    // fallback to defaults
  }
  return defaultTasks.map((t) => ({
    ...t,
    important: t.important ?? false,
  }));
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function generateTaskId(): string {
  return `tq-${Date.now().toString().slice(-6)}`;
}

export function formatDueDate(iso: string): string {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
