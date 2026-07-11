import { Button } from "@heroui/react";

interface EmptyStateProps {
  onCreateTask?: () => void;
}

export function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-indigo-ink/6">
        <svg
          className="size-8 text-indigo-ink"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <rect x="6" y="4" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 12h10M11 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="22" cy="22" r="6" fill="var(--bg)" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 19.5v5M19.5 22h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">
        No tasks yet
      </h3>
      <p className="mt-1 text-sm text-graphite">
        Create your first task to get started.
      </p>
      <Button className="mt-5" onPress={onCreateTask}>
        <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        New task
      </Button>
    </div>
  );
}
