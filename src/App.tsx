import { useEffect, useState } from "react";
import { Button, Chip, Separator } from "@heroui/react";
import { Sidebar } from "./components/Sidebar";
import { TaskItem } from "./components/TaskItem";
import { TaskBoard } from "./components/TaskBoard";
import { EmptyState } from "./components/EmptyState";
import type { Project } from "./types/project";
import { generateProjectId, loadProjects, saveProjects } from "./utils/projects";
import "./App.css";

type ViewMode = "list" | "board";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("my-tasks");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showEmpty, setShowEmpty] = useState(true);
  const [projects, setProjects] = useState<Project[]>(loadProjects);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  function handleAddProject(label: string) {
    setProjects((prev) => [...prev, { id: generateProjectId(), label }]);
  }

  function handleDeleteProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEditProject(id: string, label: string) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, label } : p)));
  }

  return (
    <div className="flex min-h-dvh w-full bg-paper">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeNav={activeNav}
        onNavChange={(nav) => {
          setActiveNav(nav);
          setSidebarOpen(false);
        }}
        projects={projects}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        onEditProject={handleEditProject}
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
            My tasks
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
              onPress={() => setShowEmpty(!showEmpty)}
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              New task
            </Button>
          </div>
        </header>

        <div className="flex items-center gap-2 border-b border-paper-edge px-4 py-2 sm:px-6">
          <Chip size="sm" variant="soft" color="accent">
            Status
          </Chip>
          <Chip size="sm" variant="secondary" color="default">
            Date
          </Chip>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6">
          {showEmpty ? (
            <EmptyState onCreateTask={() => setShowEmpty(false)} />
          ) : viewMode === "list" ? (
            <div className="space-y-1">
              <TaskItem
                title="Review dashboard design"
                project="Personal"
                date="Jul 12"
                id="#tq-042"
              />
              <TaskItem
                title="Send proposal to client"
                project="Work"
                date="Jul 10"
                id="#tq-039"
                defaultChecked
              />
              <TaskItem
                title="Research animation library"
                project="Personal"
                date="Jul 15"
                id="#tq-045"
              />
              <div className="py-12 text-center text-sm text-graphite">
                &mdash; End of tasks &mdash;
              </div>
            </div>
          ) : (
            <TaskBoard />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
