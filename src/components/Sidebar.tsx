import { SearchField, Separator } from "@heroui/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeNav: string;
  onNavChange: (nav: string) => void;
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

const projects = [
  { id: "personal", label: "Personal" },
  { id: "work", label: "Work" },
  { id: "other", label: "Other" },
];

export function Sidebar({ isOpen, onClose, activeNav, onNavChange }: SidebarProps) {
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
          <SearchField fullWidth name="search" aria-label="Search tasks" variant="secondary">
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
            <p className="mb-1.5 px-1.5 text-xs font-medium text-graphite uppercase tracking-wide">
              Projects
            </p>
            <ul className="flex flex-col gap-0.5">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => onNavChange(`project-${project.id}`)}
                    className={`
                      flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5
                      text-sm transition-colors duration-150
                      ${activeNav === `project-${project.id}`
                        ? "bg-indigo-ink/8 font-medium text-indigo-ink"
                        : "text-graphite hover:bg-ink/4 hover:text-ink"
                      }
                    `}
                  >
                    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 4.5A1.5 1.5 0 013.5 3h3.172a1.5 1.5 0 011.06.44l.829.828a1.5 1.5 0 001.06.44H12.5A1.5 1.5 0 0114 6.212V11.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 11.5v-7z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {project.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
