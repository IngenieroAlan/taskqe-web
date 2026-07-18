import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { TaskItem } from "./TaskItem";
import type { Task, TaskStatus } from "../types/task";
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
  onToggleImportant: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

const columns: BoardColumn[] = [
  { id: "todo", label: "To do", color: "var(--accent)" },
  { id: "in-progress", label: "In progress", color: "#D4A017" },
  { id: "done", label: "Done", color: "var(--success)" },
];

function DroppableColumn({
  column,
  children,
  count,
}: {
  column: BoardColumn;
  children: React.ReactNode;
  count: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: column.color }}
        />
        <span className="text-sm font-medium text-ink">
          {column.label}
        </span>
        <span className="text-xs text-graphite">
          {count}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 space-y-1 rounded-xl border bg-surface p-2 min-h-[200px] transition-colors duration-150 ${
          isOver
            ? "border-indigo-ink/40 bg-indigo-ink/5"
            : "border-paper-edge"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function TaskBoard({
  tasks,
  projects,
  onToggle,
  onToggleImportant,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function getProjectName(projectId: string): string | undefined {
    return projects.find((p) => p.id === projectId)?.label;
  }

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const newStatus = String(over.id) as TaskStatus;

    if (taskId === newStatus) return;
    if (columns.some((c) => c.id === newStatus)) {
      onStatusChange(taskId, newStatus);
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);

          return (
            <DroppableColumn key={column.id} column={column} count={columnTasks.length}>
              {columnTasks.length === 0 ? (
                <p className="py-8 text-center text-xs text-graphite/60">
                  No tasks
                </p>
              ) : (
                columnTasks.map((task) => (
                  <DraggableTaskItem
                    key={task.id}
                    task={task}
                    projectName={getProjectName(task.projectId)}
                    onToggle={onToggle}
                    onToggleImportant={onToggleImportant}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </DroppableColumn>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rounded-xl bg-surface shadow-lg opacity-90">
            <TaskItem
              task={activeTask}
              projectName={getProjectName(activeTask.projectId)}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function DraggableTaskItem({
  task,
  projectName,
  onToggle,
  onToggleImportant,
  onEdit,
  onDelete,
}: {
  task: Task;
  projectName?: string;
  onToggle: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition,
        zIndex: 50,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-40" : ""}`}
      {...attributes}
      {...listeners}
    >
      <TaskItem
        task={task}
        projectName={projectName}
        onToggle={onToggle}
        onToggleImportant={onToggleImportant}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

// Re-export useSortable for the DraggableTaskItem
import { useSortable } from "@dnd-kit/sortable";
