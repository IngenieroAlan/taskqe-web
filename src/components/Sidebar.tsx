import { useRef, useState } from "react";
import { Button, Input, Label, Modal, SearchField, Separator, TextField } from "@heroui/react";
import type { Project } from "../types/project";
import { ConfirmDialog } from "./ConfirmDialog";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeNav: string;
  onNavChange: (nav: string) => void;
  projects: Project[];
  onAddProject: (label: string) => void;
  onDeleteProject: (id: string) => void;
  onEditProject: (id: string, label: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const navItems = [
  {
    id: "my-tasks",
    label: "My tasks",
    icon: (
      <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8h6M5 5.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "today",
    label: "Today",
    icon: (
      <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 1.5v3M11 1.5v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "upcoming",
    label: "Upcoming",
    icon: (
      <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "important",
    label: "Important",
    icon: (
      <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2l1.8 3.7L14 6.5l-3 2.9.7 4.1L8 11.6l-3.7 1.9.7-4.1-3-2.9 4.2-.8L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Sidebar({
  isOpen,
  onClose,
  activeNav,
  onNavChange,
  projects,
  onAddProject,
  onDeleteProject,
  onEditProject,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  function handleAddSubmit() {
    const trimmed = newProjectName.trim();
    if (trimmed) {
      onAddProject(trimmed);
      setNewProjectName("");
      setIsAdding(false);
    }
  }

  function handleAddKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleAddSubmit();
    } else if (e.key === "Escape") {
      setNewProjectName("");
      setIsAdding(false);
    }
  }

  function handleStartAdd() {
    setIsAdding(true);
    setTimeout(() => addInputRef.current?.focus(), 0);
  }

  function handleOpenEdit(project: Project) {
    setEditingProject(project);
    setEditProjectName(project.label);
  }

  function handleEditSubmit() {
    if (editingProject) {
      const trimmed = editProjectName.trim();
      if (trimmed) {
        onEditProject(editingProject.id, trimmed);
      }
      setEditingProject(null);
      setEditProjectName("");
    }
  }

  function handleEditKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditingProject(null);
      setEditProjectName("");
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 flex h-full w-[240px] flex-col
          border-r border-paper-edge bg-surface
          transition-transform duration-250 ease-out
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center gap-2 px-4 pt-5 pb-4">
          <span
            className="flex size-7 items-center justify-center rounded-lg bg-indigo-ink text-xs font-semibold text-white"
          >
            Q
          </span>
          <span className="font-display text-base font-semibold text-ink">
            TaskQE
          </span>
        </div>

        <div className="px-3 pb-3">
          <SearchField fullWidth name="search" aria-label="Search tasks" variant="secondary" value={searchQuery} onChange={onSearchChange}>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>

        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavChange(item.id)}
                  className={`
                    flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5
                    text-sm transition-colors duration-150
                    ${activeNav === item.id
                      ? "bg-indigo-ink/8 font-medium text-indigo-ink"
                      : "text-graphite hover:bg-ink/4 hover:text-ink"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <Separator className="my-3" />

          <div className="px-1">
            <div className="mb-1.5 flex items-center justify-between px-1.5">
              <p className="text-xs font-medium text-graphite uppercase tracking-wide">
                Projects
              </p>
              <button
                type="button"
                onClick={handleStartAdd}
                className="flex size-5 items-center justify-center rounded text-graphite transition-colors duration-150 hover:bg-ink/8 hover:text-ink"
                aria-label="Add project"
              >
                <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {isAdding && (
              <div className="mb-1 px-1">
                <input
                  ref={addInputRef}
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={handleAddKeyDown}
                  onBlur={handleAddSubmit}
                  placeholder="Project name..."
                  className="w-full rounded-md border border-paper-edge bg-surface px-2.5 py-1.5 text-sm text-ink outline-none transition-colors duration-150 focus:border-indigo-ink/40"
                />
              </div>
            )}

            <ul className="flex flex-col gap-0.5">
              {projects.map((project) => (
                <li key={project.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => onNavChange(`project-${project.id}`)}
                    onDoubleClick={() => handleOpenEdit(project)}
                    className={`
                      flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 pr-8
                      text-sm transition-colors duration-150
                      ${activeNav === `project-${project.id}`
                        ? "bg-indigo-ink/8 font-medium text-indigo-ink"
                        : "text-graphite hover:bg-ink/4 hover:text-ink"
                      }
                    `}
                  >
                    <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 4.5A1.5 1.5 0 013.5 3h3.172a1.5 1.5 0 011.06.44l.829.828a1.5 1.5 0 001.06.44H12.5A1.5 1.5 0 0114 6.212V11.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 11.5v-7z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {project.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingProject(project)}
                    className="absolute right-1 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-graphite opacity-0 transition-all duration-150 hover:bg-danger/10 hover:text-danger group-hover:opacity-100"
                    aria-label={`Delete ${project.label}`}
                  >
                    <svg className="size-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      <Modal.Backdrop isOpen={editingProject !== null} onOpenChange={(open) => { if (!open) { setEditingProject(null); setEditProjectName(""); } }}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[320px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit project</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <TextField className="w-full" variant="secondary">
                <Label>Project name</Label>
                <Input
                  value={editProjectName}
                  onChange={(e) => setEditProjectName(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  placeholder="Enter project name"
                />
              </TextField>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close" onPress={handleEditSubmit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      <ConfirmDialog
        isOpen={deletingProject !== null}
        onClose={() => setDeletingProject(null)}
        onConfirm={() => { if (deletingProject) { onDeleteProject(deletingProject.id); setDeletingProject(null); } }}
        title="Delete project?"
        description={`Are you sure you want to delete "${deletingProject?.label ?? ""}" and all its tasks? This action cannot be undone.`}
      />
    </>
  );
}
