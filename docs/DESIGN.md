# TaskQE — Design System

## Brief

**Product:** TaskQE — Notion-style task management web application.
**Audience:** Professionals and students looking for a clean, warm, and distinctive productivity tool.
**Main screen job:** Task management dashboard: create, organize, filter, and complete tasks with a fluid and visually distinctive experience.

---

## Color palette

Inspired by high-quality Japanese desktop paper aesthetics: warm white as base, with a violet-indigo ink as a distinctive accent.

| Token | Name | HEX | Usage |
|---|---|---|---|
| `--bg` | Paper White | `#FAFAF8` | App background |
| `--surface` | Surface | `#FFFFFF` | Cards, panels, modals |
| `--text` | Ink | `#1A1A1A` | Primary text |
| `--text-muted` | Graphite | `#6B6B6B` | Secondary text, labels |
| `--accent` | Indigo Ink | `#5B4FCF` | Primary actions, links, active state |
| `--success` | Sage | `#3D8B6E` | Completed tasks, positive states |
| `--border` | Paper Edge | `#E8E6E1` | Subtle borders, dividers |

---

## Typography

Three typographic roles with clear personality:

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | **Fraunces** | 600-700 | Section titles, page headings |
| Body | **DM Sans** | 400-500 | Task text, descriptions, general UI |
| Mono | **JetBrains Mono** | 400 | Task IDs, dates, technical data |

**Type scale:**
- H1: 2rem / 700
- H2: 1.5rem / 600
- H3: 1.125rem / 600
- Body: 0.9375rem / 400 (15px)
- Small: 0.8125rem / 400 (13px)
- Mono: 0.8125rem / 400

---

## Layout

### General structure

```
+------------------+----------------------------------------+
|                  |                                        |
|    SIDEBAR       |           MAIN CONTENT                 |
|    (240px)       |                                        |
|                  |  +----------------------------------+  |
|  - Search        |  |  Header (title + actions)        |  |
|  - Navigation    |  +----------------------------------+  |
|  - Lists         |                                        |
|  - Filters       |  +----------------------------------+  |
|                  |  |  Task List / Board               |  |
|                  |  |  - Task items                     |  |
|                  |  |  - Empty state                    |  |
|                  |  +----------------------------------+  |
|                  |                                        |
+------------------+----------------------------------------+
```

### Sidebar (240px, collapsible)

```
+------------------+
| [Q] TaskQE       |  ← Logo/name
|                  |
| 🔍 Search...     |  ← Global search
|                  |
| 📋 My tasks      |  ← Main view
| 📅 Today         |  ← Quick filter
| 📆 Upcoming      |  ← Quick filter
| ⭐ Important     |  ← Quick filter
|                  |
| ───────────────  |
|                  |
| 📁 Projects      |  ← Categories
|   - Personal
|   - Work
|   - Other
+------------------+
```

### Main Content — List View

```
+----------------------------------+
| My tasks               [+ New]  |  ← Header with primary action
+----------------------------------+
| Filters: [Status ▾] [Date ▾]   |  ← Secondary filters
+----------------------------------+
| ○  Review dashboard design      |  ← Checkbox + title
|    Personal · Jul 12 · #tq-042 |    metadata in mono
|                                 |
| ●  Send proposal to client      |  ← Completed (with check)
|    Work · Jul 10 · #tq-039     |
|    sage green underline         |
|                                 |
| ○  Research animation library   |
|    Personal · Jul 15 · #tq-045 |
|                                 |
|    ── End of tasks ──           |  ← Empty state / end
+----------------------------------+
```

### Main Content — Board View (Kanban)

```
+----------------------------------+
| My tasks          [List|Board]   |  ← View toggle
+----------------------------------+
|  To do     |  In progress | Done
|  +---------+ | +----------+ | +--------+
|  | Task 1  | | | Task 3  | | | Task 2 |
|  | Task 4  | | | Task 5  | | | Task 6 |
|  +---------+ | +----------+ | +--------+
+----------------------------------+
```

---

## Visual signature: The animated checkbox

The element that sets TaskQE apart from other task apps is the **status checkbox**. Instead of a generic checkbox:

- **Pending:** An outlined circle in `--accent` (Indigo Ink), with a subtle glow on hover.
- **Hover:** The circle fills with 10% opacity of the accent.
- **Completed:** "Flowing ink" animation — the circle fills with `--success` (Sage) and a checkmark is drawn with a stroke that simulates ink extending from the center. The task gets a `line-through` with `--text-muted` color.

This "ink" animation connects with the paper/desktop palette and creates a satisfying moment in every interaction.

```
  ○  →  ◉  →  ●✓
hover    check    done
```

---

## Design principles

1. **Paper over screen.** The interface should feel like an organized desk, not a generic app. Generous spacing, subtle borders, no aggressive shadows.

2. **One action per view.** The main screen has one job: show and manage tasks. Don't overload with widgets, metrics, or additional dashboards.

3. **Hierarchy by visual weight.** Pending tasks have more visual weight than completed ones. The accent is reserved for actions and active states.

4. **Transitions with intent.** The checkbox animation, sidebar collapse, and view changes have a duration of 200-300ms with ease-out. No decorative animations.

5. **Empty states as invitations.** When there are no tasks, the screen shows a clear message with the suggested action ("Create your first task"), not a generic icon.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build | Vite 8 |
| Styles | CSS Modules or Tailwind (pending decision) |

---

## Pending decisions

- [ ] Tailwind CSS or CSS Modules?
- [ ] Local persistence (localStorage) or backend?
- [ ] Drag & drop for task reordering?
- [ ] Board view (Kanban) from the start or list only?
