# TaskQE — Tareas Pendientes

> **Regla:** Cada funcionalidad completada debe ser **eliminada** de este documento o **marcada como realizada** con una fecha.

---

## Críticas

- [x] Los filtros de navegación (Today, Upcoming, Important) no funcionan — solo cambian el título del header, no filtran tareas. *(2026-07-17)*
- [x] Agregar campo `important: boolean` al modelo `Task` para poder marcar tareas como importantes. *(2026-07-17)*
- [x] Las fechas de las tareas son strings display (`"Jul 12"`) sin formato ISO — imposible comparar, ordenar o filtrar por fecha. *(2026-07-17)*
- [ ] La barra de búsqueda del sidebar no tiene handler — no filtra tareas al escribir.
- [ ] Los chips de filtro (Status, Date) del header son UI estática sin handlers ni lógica de filtrado.

## Moderadas

- [x] Bug de estado en `TaskFormModal` — al editar dos tareas seguidas sin desmontar el modal, muestra datos de la primera. *(2026-07-17)*
- [x] Input de fecha en `TaskFormModal` es texto plano — sin date picker ni validación. *(2026-07-17)*
- [ ] Sin confirmación de eliminación — tareas y proyectos se borran con un click sin confirmar.
- [ ] React Router instalado pero no usado — no hay `Routes` ni `Route` definidos.
- [ ] Sin drag & drop — en vista board no se pueden mover tareas entre columnas arrastrando; en lista no se puede reordenar.

## Menores

- [ ] Sin campo de descripción/notas en las tareas.
- [ ] Sin atajos de teclado (nueva tarea, enfocar búsqueda, cerrar modales, etc.).
- [ ] Sin soporte dark mode — solo tema claro.
- [ ] Título HTML es genérico (`taskqe-web`) en vez de "TaskQE".
- [ ] README sigue siendo boilerplate de Vite.
- [ ] Posible conflicto de plugins en `vite.config.ts` — React plugin + Babel plugin configurados simultáneamente.
