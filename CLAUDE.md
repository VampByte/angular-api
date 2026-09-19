# angular-api — Actividad 6 (UNIR)

CRUD de usuarios en Angular contra la API externa `https://peticiones.online/api/users`. Actividad universitaria; el enunciado completo está en `resources/actividad-6.md` (carpeta local, excluida del repo vía `.gitignore`).

## Stack

- **Angular 22** (standalone components + signals, sin `NgModule`).
- **Tailwind CSS v4** (`@tailwindcss/postcss`, CSS-first — `@import "tailwindcss";` en `src/styles.css`, sin `tailwind.config.js`).
- **SweetAlert2** para confirmaciones de borrado y avisos de éxito/error.
- Sin SSR.

## Convenciones

- Componentes standalone, nombres de archivo sin sufijo `.component` (p. ej. `home.ts`, no `home.component.ts`) — es el naming por defecto de Angular 22.
- Llamadas al API con **promesas** (`await firstValueFrom(this.http.get<T>(url))`), no `.subscribe()`.
- Params de ruta bindeados directo a `input()` signal gracias a `withComponentInputBinding()` en `app.config.ts` — no se usa `ActivatedRoute` manual.
- Estructura de carpetas en `src/app/`:
  ```
  components/   → componentes reutilizables (p. ej. user-card)
  pages/        → una carpeta por vista/ruta (home, user-view, user-form, not-found)
  shared/       → layout compartido (nav)
  interfaces/   → tipados de la API (se crea en fase 2)
  services/     → servicios HTTP (se crea en fase 2)
  ```

## API externa

Base: `https://peticiones.online/api/users`

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/api/users` | Listado completo (Home) — respuesta paginada `{ page, per_page, total, total_pages, results: IUser[] }` |
| GET | `/api/users/:id` | Detalle de usuario |
| POST | `/api/users` | Crear usuario (mockeado, devuelve el usuario con id) |
| PUT | `/api/users/:id` | Actualizar usuario (mockeado) |
| DELETE | `/api/users/:id` | Borrar usuario (mockeado) |

`:id` es el `_id` de Mongo (string), no el campo numérico `id` — el endpoint rechaza el id numérico con `{"error":"El id debe ser correcto"}`.

Es una API de pruebas: las respuestas de create/update/delete son mockeadas (no persisten), pero devuelven una respuesta válida (OK/KO) para gestionar avisos al usuario.

## Rutas de la app

| Ruta | Componente | Descripción |
|---|---|---|
| `/home` | `Home` | Listado de usuarios en grid |
| `/user/:id` | `UserView` | Detalle de un usuario |
| `/newuser` | `UserForm` | Alta de usuario (formulario vacío) |
| `/updateuser/:id` | `UserForm` | Edición de usuario (mismo componente, precargado) |
| `**` | `NotFound` | 404 |

## Roadmap (4 fases, 1 por día)

- [x] **Fase 1** — Cimientos: proyecto Angular 22 + Tailwind v4 + SweetAlert2 instalado, estructura de carpetas, rutas base, navbar, placeholders con dirección visual base.
- [x] **Fase 2** — `IUser`, `UsersService` completo (CRUD con promesas vía `firstValueFrom`), vista Home consumiendo `getAll`, borrado desde el home con SweetAlert2.
- [ ] **Fase 3** — Vista `/user/:id` completa con sus 3 botones, formulario `/newuser` con validaciones (Reactive Forms) conectado a `create` (POST).
- [ ] **Fase 4** — Reutilizar el formulario para `/updateuser/:id` (modo edición + precarga + PUT), pulido visual, revisión end-to-end, README.

Este archivo se actualiza al cierre de cada fase (marcando el checkbox correspondiente).
