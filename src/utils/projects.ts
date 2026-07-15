import type { Project } from "../types/project";
import defaultProjects from "../data/projects.json";

const STORAGE_KEY = "taskqe-projects";

export function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Project[];
    }
  } catch {
    // fallback to defaults
  }
  return [...defaultProjects];
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function generateProjectId(): string {
  return `project-${Date.now()}`;
}
