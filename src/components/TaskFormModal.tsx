import { useState } from "react";
import { Button, Input, Label, ListBox, Modal, Select, TextField } from "@heroui/react";
import type { Project } from "../types/project";
import type { Task, TaskStatus } from "../types/task";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; projectId: string; date?: string; status: TaskStatus }) => void;
  task?: Task | null;
  projects: Project[];
}

const statusOptions = [
  { id: "todo", label: "To do" },
  { id: "in-progress", label: "In progress" },
  { id: "done", label: "Done" },
];

export function TaskFormModal({
  isOpen,
  onClose,
  onSave,
  task,
  projects,
}: TaskFormModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [projectId, setProjectId] = useState<string | null>(task?.projectId ?? null);
  const [date, setDate] = useState(task?.date ?? "");
  const [status, setStatus] = useState<string>(task?.status ?? "todo");

  function handleSubmit() {
    const trimmed = title.trim();
    if (trimmed && projectId) {
      onSave({
        title: trimmed,
        projectId,
        date: date.trim() || undefined,
        status: status as TaskStatus,
      });
      onClose();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[400px]">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>{task ? "Edit task" : "New task"}</Modal.Heading>
          </Modal.Header>
          <Modal.Body className="flex flex-col gap-4">
            <TextField className="w-full" variant="secondary">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter task title"
              />
            </TextField>

            <Select
              className="w-full"
              placeholder="Select project"
              value={projectId}
              onChange={(value) => setProjectId(value as string)}
            >
              <Label>Project</Label>
              <Select.Trigger>
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

            <TextField className="w-full" variant="secondary">
              <Label>Date</Label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Jul 20"
              />
            </TextField>

            <Select
              className="w-full"
              placeholder="Select status"
              value={status}
              onChange={(value) => setStatus(value as string)}
            >
              <Label>Status</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {statusOptions.map((opt) => (
                    <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                      {opt.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button slot="close" onPress={handleSubmit} isDisabled={!title.trim() || !projectId}>
              {task ? "Save" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
