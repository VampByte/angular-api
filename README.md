# Gestión de Usuarios — Actividad 6 (Angular)

Aplicación en Angular que consume una API externa (`peticiones.online`) para gestionar un CRUD de usuarios: listado, detalle, alta y edición.
## Stack

- [Angular 22](https://angular.dev) — standalone components + signals.
- [Tailwind CSS v4](https://tailwindcss.com) para estilos.
- [SweetAlert2](https://sweetalert2.github.io) para confirmaciones y avisos.
- Comunicación con la API vía `HttpClient` + promesas (`firstValueFrom`), no `.subscribe()`.

## Cómo revisar el proyecto

### 1. Levantar el servidor

```bash
npm install
npm start
```

La app queda disponible en `http://localhost:4200` (la primera compilación tarda unos segundos).

### 2. Recorrido funcional sugerido

1. Abrir `/home` — el listado carga usuarios reales desde la API.
2. Entrar al detalle de un usuario con **Ver detalle**.
3. Volver y probar **Actualizar** — el formulario se precarga con los datos del usuario.
4. Volver y probar **Eliminar** — pide confirmación con SweetAlert2 antes de borrar.
5. Probar **Nuevo usuario** desde el menú de navegación.

### 3. Ver los logs en consola

En la consola del navegador, buscar el prefijo `[UsersService]`. Cada acción (listar, ver detalle, crear, actualizar, eliminar) loguea el método y la URL llamados, el body enviado (en crear/actualizar) y la respuesta real devuelta por el API.

Revisando el log se puede comprobar en vivo que ese caso se detecta y gestiona correctamente, sin depender de la pestaña Network.

> Nota: crear, actualizar y eliminar están mockeados por el API externo — la respuesta es válida pero no persiste realmente, así que no sorprenda ver el mismo dato tras recargar la página.

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