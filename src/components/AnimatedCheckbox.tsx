import { useState } from "react";

interface AnimatedCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function AnimatedCheckbox({
  checked = false,
  onChange,
  className = "",
}: AnimatedCheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={`group relative flex size-5 shrink-0 items-center justify-center outline-none ${className}`}
      onClick={() => onChange?.(!checked)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="size-5"
        aria-hidden="true"
      >
        {/* Circle background - fills on hover or checked */}
        <circle
          cx="10"
          cy="10"
          r="9"
          className="fill-transparent transition-colors duration-200 ease-out"
          style={{
            fill: checked
              ? "var(--success)"
              : isHovered
                ? "var(--accent-soft)"
                : "transparent",
          }}
        />

        {/* Circle border */}
        <circle
          cx="10"
          cy="10"
          r="9"
          className="transition-colors duration-200 ease-out"
          style={{
            stroke: checked ? "var(--success)" : "var(--accent)",
            strokeWidth: checked ? 0 : 1.5,
          }}
        />

        {/* Glow effect on hover */}
        {!checked && (
          <circle
            cx="10"
            cy="10"
            r="10"
            className="transition-opacity duration-200 ease-out"
            style={{
              stroke: "var(--accent)",
              strokeWidth: 1,
              opacity: isHovered ? 0.2 : 0,
              filter: "blur(2px)",
            }}
          />
        )}

        {/* Checkmark - ink flow animation */}
        {checked && (
          <path
            d="M6 10.5L8.5 13L14 7"
            className="checkmark-path"
            style={{
              stroke: "var(--success)",
              strokeWidth: 1.8,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
        )}
      </svg>
    </button>
  );
}
