import { TaskItem } from "./TaskItem";
import type { Task } from "../types/task";
import type { Project } from "../types/project";

interface BoardColumn {
  id: string;
  label: string;
  color: string;
}

interface TaskBoardProps {
  tasks: Task[];
  projects: Project[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const columns: BoardColumn[] = [
  { id: "todo", label: "To do", color: "var(--accent)" },
  { id: "in-progress", label: "In progress", color: "#D4A017" },
  { id: "done", label: "Done", color: "var(--success)" },
];

export function TaskBoard({ tasks, projects, onToggle, onEdit, onDelete }: TaskBoardProps) {
  function getProjectName(projectId: string): string | undefined {
    return projects.find((p) => p.id === projectId)?.label;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <div key={column.id} className="flex flex-col">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span className="text-sm font-medium text-ink">
                {column.label}
              </span>
              <span className="text-xs text-graphite">
                {columnTasks.length}
              </span>
            </div>
            <div className="flex-1 space-y-1 rounded-xl border border-paper-edge bg-surface p-2 min-h-[200px]">
              {columnTasks.length === 0 ? (
                <p className="py-8 text-center text-xs text-graphite/60">
                  No tasks
                </p>
              ) : (
                columnTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    projectName={getProjectName(task.projectId)}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
