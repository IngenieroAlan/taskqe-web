import { useRef, useState } from "react";
import { Button, Label, ListBox, Select } from "@heroui/react";
import type { Project } from "../types/project";

interface CreateTaskInlineProps {
  projects: Project[];
  defaultProjectId?: string;
  onSave: (title: string, projectId: string) => void;
  onCancel: () => void;
}

export function CreateTaskInline({
  projects,
  defaultProjectId,
  onSave,
  onCancel,
}: CreateTaskInlineProps) {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState<string | null>(defaultProjectId ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const trimmed = title.trim();
    if (trimmed && projectId) {
      onSave(trimmed, projectId);
      setTitle("");
      setProjectId(null);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      onCancel();
    }
  }

  return (
    <div className="rounded-xl border border-paper-edge bg-surface p-3">
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Task name..."
        autoFocus
        className="mb-3 w-full bg-transparent text-sm text-ink outline-none placeholder:text-graphite/50"
      />
      <div className="flex items-center gap-2">
        <Select
          className="w-[160px]"
          placeholder="Project"
          value={projectId}
          onChange={(value) => setProjectId(value as string)}
        >
          <Label className="sr-only">Project</Label>
          <Select.Trigger size="sm">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {projects.map((project) => (
                <ListBox.Item key={project.id} id={project.id} textValue={project.label}>
                  {project.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <div className="ml-auto flex items-center gap-1.5">
          <Button size="sm" variant="ghost" onPress={onCancel}>
            Cancel
          </Button>
          <Button size="sm" onPress={handleSubmit} isDisabled={!title.trim() || !projectId}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
