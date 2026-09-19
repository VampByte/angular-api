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

Es una API de pruebas: las respuestas de create/update/delete son mockeadas (no persisten), pero devuelven una respuesta válida (OK/KO) para gestionar avisos al usuario. Verificado en vivo: un `DELETE` devuelve `200` con el usuario, pero un `GET` inmediatamente después sigue trayendo el mismo usuario sin cambios — el servidor nunca borra nada de verdad, ni desde Home ni desde `user-view`.

**Pendiente (revisar al final del proyecto, no bloquea ninguna fase):** el borrado desde Home oculta al usuario "eliminado" con un filtro en memoria (`users.update(...)`), que se pierde en un F5. Se probó ocultar el eliminado en Home al volver desde `/user/:id` pasando el id por `Router.navigate(..., { state })`, pero se revirtió porque ese mecanismo sobrevive a un F5 y el borrado desde Home no, generando una inconsistencia distinta. Si se quiere una experiencia uniforme entre ambos caminos, evaluar mover el filtrado a un estado compartido (ej. `sessionStorage` o una señal en `UsersService`) en vez de arreglarlo por separado en cada componente.

**Contrato real de `POST /api/users`** (confirmado contra la doc en `https://peticiones.online/users`): el body espera `first_name`, `last_name`, `username`, `email`, `password` — **no** un campo `image` (la imagen se genera del lado del servidor a partir del email, ej. `https://i.pravatar.cc/500?u=<email>`). El enunciado de la actividad pide igualmente validar una URL de imagen en el formulario, así que el campo se mantiene y se envía en el body (el API simplemente lo ignora, no rompe nada). `PUT /api/users/:id` acepta actualizaciones parciales (no hace falta mandar todos los campos).

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
- [x] **Fase 3** — Vista `/user/:id` con datos reales (`effect()` sobre `id()`), sus 3 botones (Volver/Actualizar/Eliminar con confirmación SweetAlert2), y formulario `/newuser` con Reactive Forms + validaciones conectado a `create` (POST). El submit ya soporta también el modo edición (`update`/PUT) reusando el mismo `FormGroup`, pero **sin precarga de datos todavía** — eso es Fase 4.
- [ ] **Fase 4** — Precarga de datos en `/updateuser/:id` (modo edición completo), pulido visual, revisión end-to-end, README.

Este archivo se actualiza al cierre de cada fase (marcando el checkbox correspondiente).
