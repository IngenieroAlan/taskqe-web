import { AnimatedCheckbox } from "./AnimatedCheckbox";
import type { Task } from "../types/task";
import { formatDueDate } from "../utils/tasks";

interface TaskItemProps {
  task: Task;
  projectName?: string;
  onToggle?: (id: string) => void;
  onToggleImportant?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

const statusColors: Record<string, string> = {
  "todo": "bg-graphite/15 text-graphite",
  "in-progress": "bg-amber-500/15 text-amber-700",
  "done": "bg-sage/15 text-sage",
};

const statusLabels: Record<string, string> = {
  "todo": "To do",
  "in-progress": "In progress",
  "done": "Done",
};

export function TaskItem({
  task,
  projectName,
  onToggle,
  onToggleImportant,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <div
      className={`
        group flex items-start gap-3 rounded-xl px-3 py-2.5
        transition-colors duration-200 hover:bg-ink/3
        ${task.completed ? "opacity-60" : ""}
      `}
    >
      <AnimatedCheckbox
        checked={task.completed}
        onChange={() => onToggle?.(task.id)}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-sm leading-snug transition-all duration-200
            ${task.completed
              ? "text-graphite line-through decoration-graphite/40"
              : "text-ink"
            }
          `}
        >
          {task.title}
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs text-graphite">
          {projectName && <span>{projectName}</span>}
          {projectName && task.dueDate && <span className="text-paper-edge">&middot;</span>}
          {task.dueDate && <span>{formatDueDate(task.dueDate)}</span>}
          {task.dueDate && task.id && <span className="text-paper-edge">&middot;</span>}
          {task.id && (
            <span className="font-mono text-[0.6875rem] text-graphite/70">
              #{task.id}
            </span>
          )}
          <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[0.625rem] font-medium ${statusColors[task.status]}`}>
            {statusLabels[task.status]}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        {onToggleImportant && (
          <button
            type="button"
            onClick={() => onToggleImportant(task.id)}
            className={`flex size-6 items-center justify-center rounded transition-colors duration-150 ${
              task.important
                ? "text-amber"
                : "text-graphite/40 opacity-0 group-hover:opacity-100 hover:text-amber"
            }`}
            aria-label={task.important ? `Remove importance from ${task.title}` : `Mark ${task.title} as important`}
          >
            {task.important ? (
              <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1.5l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.36 4.48 12.31l.67-3.91L2.31 5.63l3.93-.57L8 1.5z" />
              </svg>
            ) : (
              <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M8 1.5l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.36 4.48 12.31l.67-3.91L2.31 5.63l3.93-.57L8 1.5z" />
              </svg>
            )}
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="flex size-6 items-center justify-center rounded text-graphite opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-ink/8 hover:text-ink"
            aria-label={`Edit ${task.title}`}
          >
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="flex size-6 items-center justify-center rounded text-graphite opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-danger/10 hover:text-danger"
            aria-label={`Delete ${task.title}`}
          >
            <svg className="size-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
