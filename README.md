# Gestión de Usuarios — Actividad 6 (Angular)

Aplicación en Angular que consume una API externa (`peticiones.online`) para gestionar un CRUD de usuarios: listado, detalle, alta y edición. Actividad de la asignatura de desarrollo Frontend de UNIR.

## Stack

- [Angular 22](https://angular.dev) — standalone components + signals, sin `NgModule`.
- [Tailwind CSS v4](https://tailwindcss.com) para estilos.
- [SweetAlert2](https://sweetalert2.github.io) para confirmaciones y avisos.
- Comunicación con la API vía `HttpClient` + promesas (`firstValueFrom`), no `.subscribe()`.

## Cómo correrlo

```bash
npm install
npm start
```

La app queda disponible en `http://localhost:4200`.

## Rutas

| Ruta | Descripción |
|---|---|
| `/home` | Listado de usuarios en grid |
| `/user/:id` | Detalle de un usuario |
| `/newuser` | Alta de usuario |
| `/updateuser/:id` | Edición de usuario (reutiliza el formulario de alta, precargado) |

## API externa

Base: `https://peticiones.online/api/users` — CRUD completo (`GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`). Es una API de pruebas: las escrituras (crear/actualizar/borrar) devuelven una respuesta válida pero no persisten datos realmente.

## Estructura

```
src/app/
  components/   → componentes reutilizables (user-card)
  pages/        → una carpeta por vista/ruta (home, user-view, user-form, not-found)
  shared/       → layout compartido (nav)
  interfaces/   → tipados de la API (IUser, IUsersResponse)
  services/     → UsersService (CRUD contra el API)
```

Más detalle de convenciones y decisiones del proyecto en `CLAUDE.md`.
