import { useState } from "react";
import { AnimatedCheckbox } from "./AnimatedCheckbox";

interface TaskItemProps {
  title: string;
  project?: string;
  date?: string;
  id?: string;
  defaultChecked?: boolean;
}

export function TaskItem({
  title,
  project,
  date,
  id,
  defaultChecked = false,
}: TaskItemProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div
      className={`
        group flex items-start gap-3 rounded-xl px-3 py-2.5
        transition-colors duration-200 hover:bg-ink/3
        ${checked ? "opacity-60" : ""}
      `}
    >
      <AnimatedCheckbox
        checked={checked}
        onChange={setChecked}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-sm leading-snug transition-all duration-200
            ${checked
              ? "text-graphite line-through decoration-graphite/40"
              : "text-ink"
            }
          `}
        >
          {title}
        </p>
        {(project || date || id) && (
          <div className="mt-1 flex items-center gap-2 text-xs text-graphite">
            {project && <span>{project}</span>}
            {project && date && <span className="text-paper-edge">&middot;</span>}
            {date && <span>{date}</span>}
            {date && id && <span className="text-paper-edge">&middot;</span>}
            {id && (
              <span className="font-mono text-[0.6875rem] text-graphite/70">
                {id}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
