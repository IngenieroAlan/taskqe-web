# AGENTS.md — Agent Instructions

## Project

**TaskQE** — Notion-style task management web application.

## Commands

| Action | Command |
|---|---|
| Development | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Preview | `pnpm preview` |

**Important:** Always run `pnpm lint` after writing code to verify there are no errors.

## Stack

| Layer | Version |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| React Compiler | Enabled (babel) |
| Package manager | pnpm |

## Code conventions

### Files
- Components in `src/components/` — one component per file, PascalCase naming
- Styles alongside the component: `Component.module.css` or `Component.css`
- Utilities in `src/utils/`
- Types/shared in `src/types/`
- Assets in `src/assets/`

### TypeScript
- `verbatimModuleSyntax: true` — use `import type` for type imports
- `noUnusedLocals: true` — no unused variables
- `noUnusedParameters: true` — no unused parameters
- `noFallthroughCasesInSwitch: true`
- Target: ES2023

### React
- Use React Compiler (babel plugin already configured)
- Prefix components with `use` for hooks
- No `any` — prefer explicit types
- Functional components only

### Styles
- Decision pending: CSS Modules or Tailwind
- Design reference: `docs/DESIGN.md`
- Follow the palette and typography defined in the design system

### ESLint
- Config in `eslint.config.js` (flat config)
- Active plugins: react-hooks, react-refresh, typescript-eslint
- `globalIgnores: ['dist']`

## Design System

See `docs/DESIGN.md` for:
- Color palette
- Typography and scale
- Layout and components
- Visual signature (animated checkbox)
- Design principles

## Current structure

```
src/
  App.tsx       ← Main component (Vite template, pending replacement)
  App.css
  main.tsx      ← Entry point
  index.css
  assets/
```

## Important rules

1. **Do not install new dependencies** without confirming first
2. **Run `pnpm lint`** after every change
3. **Follow the design system** in `docs/DESIGN.md`
4. **Do not add comments** to the code unless requested
5. **Handle empty states** — never leave screens without content
6. **Responsive** — mobile-first, minimum breakpoints: 640px, 1024px, 1440px
