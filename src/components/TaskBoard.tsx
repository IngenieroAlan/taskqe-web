import { TaskItem } from "./TaskItem";

interface BoardColumn {
  id: string;
  label: string;
  color: string;
}

const columns: BoardColumn[] = [
  { id: "todo", label: "To do", color: "var(--accent)" },
  { id: "in-progress", label: "In progress", color: "#D4A017" },
  { id: "done", label: "Done", color: "var(--success)" },
];

export function TaskBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col">
          <div className="mb-3 flex items-center gap-2 px-1">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            <span className="text-sm font-medium text-ink">
              {column.label}
            </span>
          </div>
          <div className="flex-1 space-y-1 rounded-xl border border-paper-edge bg-surface p-2 min-h-[200px]">
            {column.id === "todo" && (
              <TaskItem
                title="Review dashboard design"
                project="Personal"
                date="Jul 12"
                id="#tq-042"
              />
            )}
            {column.id === "done" && (
              <TaskItem
                title="Send proposal to client"
                project="Work"
                date="Jul 10"
                id="#tq-039"
                defaultChecked
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
