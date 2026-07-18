import { useEffect, useMemo, useState } from "react";
import { Button, Chip, Dropdown, Separator } from "@heroui/react";
import { Sidebar } from "./components/Sidebar";
import { TaskItem } from "./components/TaskItem";
import { TaskBoard } from "./components/TaskBoard";
import { EmptyState } from "./components/EmptyState";
import { CreateTaskInline } from "./components/CreateTaskInline";
import { TaskFormModal } from "./components/TaskFormModal";
import type { Project } from "./types/project";
import type { Task, TaskStatus } from "./types/task";
import { generateProjectId, loadProjects, saveProjects } from "./utils/projects";
import { generateTaskId, loadTasks, saveTasks } from "./utils/tasks";
import "./App.css";

type ViewMode = "list" | "board";
type DateFilter = "all" | "overdue" | "today" | "upcoming";

const navLabels: Record<string, string> = {
  "my-tasks": "My tasks",
  today: "Today",
  upcoming: "Upcoming",
  important: "Important",
};

const statusLabels: Record<string, string> = {
  all: "Status",
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

const dateLabels: Record<string, string> = {
  all: "Date",
  overdue: "Overdue",
  today: "Today",
  upcoming: "Upcoming",
};

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("my-tasks");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showInlineCreate, setShowInlineCreate] = useState(false);
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (activeNav.startsWith("project-")) {
      const projectId = activeNav.replace("project-", "");
      result = result.filter((t) => t.projectId === projectId);
    }

    const today = getTodayISO();

    switch (activeNav) {
      case "today":
        result = result.filter((t) => t.dueDate === today);
        break;
      case "upcoming":
        result = result.filter((t) => t.dueDate && t.dueDate > today);
        break;
      case "important":
        result = result.filter((t) => t.important);
        break;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.id.toLowerCase().includes(query),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (dateFilter !== "all") {
      switch (dateFilter) {
        case "overdue":
          result = result.filter((t) => t.dueDate && t.dueDate < today);
          break;
        case "today":
          result = result.filter((t) => t.dueDate === today);
          break;
        case "upcoming":
          result = result.filter((t) => t.dueDate && t.dueDate > today);
          break;
      }
    }

    return result;
  }, [tasks, activeNav, searchQuery, statusFilter, dateFilter]);

  const headerTitle = useMemo(() => {
    if (activeNav.startsWith("project-")) {
      const projectId = activeNav.replace("project-", "");
      return projects.find((p) => p.id === projectId)?.label ?? "Project";
    }
    return navLabels[activeNav] ?? "My tasks";
  }, [activeNav, projects]);

  const activeProjectId = activeNav.startsWith("project-")
    ? activeNav.replace("project-", "")
    : undefined;

  function handleAddProject(label: string) {
    setProjects((prev) => [...prev, { id: generateProjectId(), label }]);
  }

  function handleDeleteProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEditProject(id: string, label: string) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, label } : p)));
  }

  function handleCreateTask(title: string, projectId: string) {
    const dueDate = getTodayISO();
    setTasks((prev) => [
      ...prev,
      { id: generateTaskId(), title, projectId, dueDate, status: "todo" as TaskStatus, completed: false, important: false },
    ]);
    setShowInlineCreate(false);
  }

  function handleUpdateTask(data: { title: string; projectId: string; dueDate?: string; status: TaskStatus; important: boolean }) {
    if (!editingTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id
          ? { ...t, ...data, completed: data.status === "done" }
          : t
      )
    );
    setEditingTask(null);
  }

  function handleToggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const newCompleted = !t.completed;
        return {
          ...t,
          completed: newCompleted,
          status: newCompleted ? "done" : "todo",
        };
      })
    );
  }

  function handleToggleImportant(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
  }

  function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function getProjectName(projectId: string): string | undefined {
    return projects.find((p) => p.id === projectId)?.label;
  }

  function handleNavChange(nav: string) {
    setActiveNav(nav);
    setStatusFilter("all");
    setDateFilter("all");
    setSearchQuery("");
    setSidebarOpen(false);
  }

  return (
    <div className="flex min-h-dvh w-full bg-paper">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        projects={projects}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        onEditProject={handleEditProject}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-paper-edge bg-paper/80 px-4 py-3 backdrop-blur-md sm:px-6">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onPress={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Button>

          <h1 className="font-display text-lg font-semibold text-ink sm:text-xl">
            {headerTitle}
          </h1>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center rounded-lg border border-paper-edge bg-surface p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`
                  rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150
                  ${viewMode === "list"
                    ? "bg-ink/5 text-ink"
                    : "text-graphite hover:text-ink"
                  }
                `}
                aria-pressed={viewMode === "list"}
              >
                <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("board")}
                className={`
                  rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150
                  ${viewMode === "board"
                    ? "bg-ink/5 text-ink"
                    : "text-graphite hover:text-ink"
                  }
                `}
                aria-pressed={viewMode === "board"}
              >
                <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="8" y="2" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
            </div>

            <Button
              size="sm"
              onPress={() => setShowInlineCreate(true)}
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              New task
            </Button>
          </div>
        </header>

        <div className="flex items-center gap-2 border-b border-paper-edge px-4 py-2 sm:px-6">
          <Dropdown>
            <Dropdown.Trigger>
              <Chip
                size="sm"
                variant={statusFilter !== "all" ? "soft" : "secondary"}
                color={statusFilter !== "all" ? "accent" : "default"}
                className="cursor-pointer select-none"
              >
                {statusFilter === "all" ? "Status" : statusLabels[statusFilter]}
              </Chip>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item id="all" onAction={() => setStatusFilter("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item id="todo" onAction={() => setStatusFilter("todo")}>
                To do
              </Dropdown.Item>
              <Dropdown.Item id="in-progress" onAction={() => setStatusFilter("in-progress")}>
                In progress
              </Dropdown.Item>
              <Dropdown.Item id="done" onAction={() => setStatusFilter("done")}>
                Done
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Trigger>
              <Chip
                size="sm"
                variant={dateFilter !== "all" ? "soft" : "secondary"}
                color={dateFilter !== "all" ? "accent" : "default"}
                className="cursor-pointer select-none"
              >
                {dateFilter === "all" ? "Date" : dateLabels[dateFilter]}
              </Chip>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item id="all" onAction={() => setDateFilter("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item id="overdue" onAction={() => setDateFilter("overdue")}>
                Overdue
              </Dropdown.Item>
              <Dropdown.Item id="today" onAction={() => setDateFilter("today")}>
                Today
              </Dropdown.Item>
              <Dropdown.Item id="upcoming" onAction={() => setDateFilter("upcoming")}>
                Upcoming
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6">
          {filteredTasks.length === 0 && !showInlineCreate ? (
            <EmptyState onCreateTask={() => setShowInlineCreate(true)} />
          ) : viewMode === "list" ? (
            <div className="space-y-1">
              {showInlineCreate && (
                <CreateTaskInline
                  projects={projects}
                  defaultProjectId={activeProjectId}
                  onSave={handleCreateTask}
                  onCancel={() => setShowInlineCreate(false)}
                />
              )}
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  projectName={getProjectName(task.projectId)}
                  onToggle={handleToggleTask}
                  onToggleImportant={handleToggleImportant}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              ))}
              <div className="py-12 text-center text-sm text-graphite">
                &mdash; End of tasks &mdash;
              </div>
            </div>
          ) : (
            <TaskBoard
              tasks={filteredTasks}
              projects={projects}
              onToggle={handleToggleTask}
              onToggleImportant={handleToggleImportant}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </main>

      <TaskFormModal
        key={editingTask?.id ?? "new"}
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        onSave={handleUpdateTask}
        task={editingTask}
        projects={projects}
      />
    </div>
  );
}

export default App;
