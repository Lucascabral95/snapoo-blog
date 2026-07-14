<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React Logo" width="180"/>
</p>

# Snapoo Blog

## Descripción general

**Snapoo Blog** es una red social de fotografía desarrollada en Next.js y TypeScript, donde los usuarios pueden crear perfiles, compartir imágenes, interactuar y descubrir contenido visual. El proyecto implementa arquitectura modular, autenticación segura, almacenamiento en la nube y una UI moderna y responsiva con SCSS y Tailwind CSS.

---

## Caracteristicas principales

- **Autenticación y Autorización:** Inicio de sesión con Google/email, gestión de sesiones seguras con NextAuth.js.
- **Gestión de Imágenes:** Subida, manipulación y almacenamiento eficiente en Cloudinary.
- **Perfiles de Usuario:** Visualización de fotos propias, reposts y detalles de usuario.
- **Interacción Social:** Likes, reposts y comentarios en publicaciones.
- **Feed Dinámico:** Descubrimiento de contenido, búsqueda y filtrado avanzado.
- **UI Responsive:** Diseño profesional tipo masonry, animaciones suaves y experiencia optimizada en mobile.
- **Gestión de Errores y Feedback:** Manejo global de errores y notificaciones contextuales.
- **Optimización de Performance:** SSR, lazy loading y caching inteligente con Next.js.
- **Seguridad:** Validación de datos y protección de rutas.
- **Testing Extensivo:** Pruebas unitarias y de integración.
- **Documentación:** Documentación clara de la API y componentes.

---

## Tecnologias utilizadas

- **Framework:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos:** [MongoDB](https://www.mongodb.com/)
- **Gestión de Estado:** React Context
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/), [SCSS](https://sass-lang.com/)
- **Autenticación:** [NextAuth.js](https://next-auth.js.org/), [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- **Media:** [Cloudinary](https://cloudinary.com/)
- **Validación:** [Zod](https://zod.dev/)
- **Testing:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting & Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

---

## Tabla de contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Instalación

1. **Cloná el repositorio:**

```bash
git clone https://github.com/Lucascabral95/snapoo-blog.git
cd snapoo
```

2. **Instalá las dependencias:**

```bash
npm install
```

3. **Configurá las variables de entorno:**

```bash
cp .env.template .env.local
```

4. **Compilá el proyecto:**

```bash
npm run dev
```

## Uso

La aplicación estará disponible en:

`http://localhost:3000`

## Estructura del proyecto

```bash
+-- src/
│   +-- app/
│   │   +-- api/                  # Rutas de API
│   │   +-- feed/                 # Feed principal y subrutas
│   │   +-- usuario/              # Perfil de usuario
│   │   +-- posteo/               # Detalle de posteos
│   │   +-- fonts/                # Fuentes personalizadas
│   │   +-- globals.css           # Estilos globales
│   │   +-- layout.tsx            # Layout principal
│   │   +-- page.tsx              # Página de inicio
│   +-- DAO/                      # Acceso a datos
│   +-- infrastructure/           # Configuración, interfaces, servicios
│   +-- models/                   # Modelos de datos
│   +-- presentation/             # Componentes de UI
│   +-- services/                 # Lógica de negocio
+-- public/                       # Assets estáticos
+-- .eslintrc.js                  # Configuración de ESLint
+-- next.config.js                 # Configuración de Next.js
+-- package.json                  # Dependencias y scripts
+-- tailwind.config.js            # Configuración de Tailwind
+-- tsconfig.json                 # Configuración de TypeScript
+-- README.md                     # Documentación
```

## Moderacion y seguridad de la comunidad

Snapoo incluye un sistema de moderacion manual para proteger a la comunidad y administrar contenido denunciado.

### Roles

- `user`: puede publicar, comentar, denunciar y bloquear.
- `moderator`: puede revisar reportes, retirar contenido y suspender cuentas por 1, 7 o 30 dias.
- `admin`: puede resolver reportes, restaurar contenido, suspender cuentas por plazos personalizados y administrar roles.

Para definir el primer administrador, configurá en `.env.local`:

```env
MODERATION_BOOTSTRAP_ADMIN_EMAIL="tu-email@example.com"
```

Reiniciá Next.js y volvé a iniciar sesión con esa cuenta. El email se promueve automáticamente a `admin`.

### Reportes y bloqueos

Los usuarios pueden denunciar posteos, comentarios y perfiles desde el detalle del posteo, los comentarios y los perfiles. También pueden bloquear usuarios; el bloqueo oculta mutuamente sus perfiles, posteos y comentarios.

La cola administrativa está disponible en `/admin/moderation/reports`. La gestión de roles está en `/admin/moderation/staff`.

Las medidas aplicadas quedan auditadas y generan notificaciones in-app para la cuenta afectada. El contenido retirado se conserva para permitir restauración y no se elimina automáticamente de la base durante el período de retención.

### Migracion de imagenes de Cloudinary

Las nuevas publicaciones guardan el `publicId` de Cloudinary y se entregan mediante una ruta autenticada. Para migrar las imágenes existentes, asegurate de tener las variables de MongoDB y Cloudinary en `.env.local`.

Primero ejecutá una simulación:

```bash
npm run moderation:migrate-media:check
```

Revisá el JSON final (`migrated` y `skipped`). Si el resultado es correcto, aplicá la migración:

```bash
npm run moderation:migrate-media:apply
```

La migración es idempotente: solo procesa publicaciones que todavía no tienen `cloudinaryPublicId`. Hacé una copia de seguridad de MongoDB y verificá la cuenta de Cloudinary antes de usar el comando `:apply`.

### Configuracion requerida

Además de las credenciales existentes, la moderación usa:

```env
MODERATION_BOOTSTRAP_ADMIN_EMAIL="tu-email@example.com"
MODERATION_RETENTION_DAYS=730
MAX_REPORTS_PER_HOUR=10
MEDIA_PRIVATE_DELIVERY_ENABLED=false
```

`MEDIA_PRIVATE_DELIVERY_ENABLED` se mantiene como bandera de despliegue; activala después de verificar la migración de assets.

### Validacion

```bash
npm test
npm run lint
npm run build
```

## Notificaciones e interacciones sociales

Snapoo incluye un sistema de actividad social persistente y autenticado:

- **Likes idempotentes:** `PostLike` garantiza un único like por usuario y publicación. `PUT /api/posteos?id=:id` crea el like y `PATCH /api/posteos?id=:id` lo elimina sin duplicar contadores.
- **Seguimientos:** `UserFollow` garantiza un único seguimiento por par de usuarios. `PUT`, `GET` y `DELETE /api/follows/:userId` permiten seguir, consultar y dejar de seguir.
- **Comentarios y respuestas:** `POST /api/comentarios` acepta `parentComment` para una única profundidad de respuestas. Las respuestas se muestran debajo del comentario padre.
- **Notificaciones sociales:** likes, comentarios, respuestas y nuevos seguidores generan notificaciones sólo para otras personas y respetan los bloqueos mutuos.
- **Agrupación:** likes y follows del mismo recurso se agrupan dentro de una ventana de 24 horas; comentarios y respuestas permanecen individuales para conservar el contexto.
- **Centro de notificaciones:** `/feed/notificaciones` muestra estados de carga, error y vacío, enlaces al recurso relacionado y marca las notificaciones como leídas al abrirse.
- **Navegación:** la campana de escritorio y el acceso del menú móvil muestran el contador de no leídas.

### API de notificaciones

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/api/notifications?page=1&limit=20` | Devuelve notificaciones paginadas y `unread`. |
| `PATCH` | `/api/notifications` | Marca todas como leídas; acepta `{ "notificationId": "..." }` para marcar una sola. |

Las notificaciones sociales expiran mediante TTL. La retención se configura con `SOCIAL_NOTIFICATION_RETENTION_DAYS` y usa 90 días por defecto:

```env
SOCIAL_NOTIFICATION_RETENTION_DAYS=90
```

Las relaciones `PostLike` y `UserFollow` tienen índices únicos compuestos. Las consultas de notificaciones utilizan índices por destinatario, estado de lectura y fecha.

### Validación de interacciones

La API exige sesión activa, verifica que el recurso exista y no haya sido retirado, evita auto-notificaciones, rechaza interacciones entre usuarios bloqueados e impide responder a otra respuesta.

### Pruebas sociales

La suite cubre agrupación temporal, etiquetas de actores, lectura de notificaciones, idempotencia de follows y likes, toggle like/unlike y respuestas de rutas autenticadas:

```bash
npm test
npm run build
```
## Contribuciones

¡Las contribuciones son bienvenidas! Seguí estos pasos:

1. Hacé un fork del repositorio.
2. Creá una rama para tu feature o fix (`git checkout -b feature/nueva-funcionalidad`).
3. Realizá tus cambios y escribí pruebas si es necesario.
4. Hacé commit y push a tu rama (`git commit -m "feat: agrega nueva funcionalidad"`).
5. Abrí un Pull Request describiendo tus cambios.

---

## Licencia

Este proyecto está bajo la licencia **MIT**.

---

## Contacto

- **Autor:** Lucas Cabral
- **LinkedIn:** [https://www.linkedin.com/in/lucas-gastón-cabral/](https://www.linkedin.com/in/lucas-gastón-cabral/)
- **Portfolio:** [https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/](https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/)
- **Github:** [https://github.com/Lucascabral95](https://github.com/Lucascabral95/)

---


### Purga automática de cuentas

La purga de cuentas desactivadas se ejecuta diariamente mediante `/.github/workflows/account-purge.yml`. Configurá los secretos `NEXTAUTH_URL` y `ACCOUNT_PURGE_JOB_TOKEN` en GitHub Actions. El token debe ser aleatorio, tener al menos 32 caracteres y coincidir con `ACCOUNT_PURGE_JOB_TOKEN` del entorno de la aplicación.

También podés ejecutarla manualmente desde el repositorio o con:

```bash
npm run account:purge
```

### Smoke check de cuenta

Con la aplicación levantada y un entorno configurado, `npm run account:smoke` valida que estén cargadas las credenciales de SMTP/Google, comprueba que recuperación de contraseña mantenga la respuesta no enumerable y verifica que el redirect OAuth de Google sea accesible. La devolución de Google debe completarse manualmente en el navegador con una cuenta real; el script nunca imprime secretos ni envía credenciales.

```bash
npm run account:smoke
```
## Gestion de cuentas, seguridad y soporte

La pantalla `/feed/ajustes` agrupa Perfil, Seguridad, Privacidad y Soporte.

- **Seguridad:** recuperacion de contrasena con token de un solo uso, cambio de contrasena, cambio de email con confirmacion y reautenticacion de diez minutos. Las cuentas Google se reautentican con el proveedor y no reciben una contrasena local.
- **Sesiones:** cada inicio de sesion se registra por dispositivo, con actividad, vencimiento e IP hasheada. Se puede revocar un dispositivo o cerrar todas las otras sesiones.
- **Privacidad:** perfiles publicos o privados, preferencia de mensajes, exportacion JSON y desactivacion recuperable durante 30 dias.
- **Soporte:** usuarios autenticados pueden crear y consultar tickets. Moderadores y administradores los asignan y cambian de estado desde `/admin/moderation/support`.

### API de cuenta

| Metodo | Endpoint | Uso |
| --- | --- | --- |
| `GET` | `/api/account/sessions` | Lista los dispositivos de la cuenta. |
| `DELETE` | `/api/account/sessions/:id` | Revoca una sesion concreta. |
| `DELETE` | `/api/account/sessions` | Cierra las otras sesiones. |
| `POST` | `/api/account/reauthenticate` | Crea un desafio temporal para acciones sensibles. |
| `POST` | `/api/account/password` | Cambia la contrasena y revoca las otras sesiones. |
| `POST` | `/api/account/email` | Solicita el cambio de email. |
| `POST` | `/api/account/email/verify` | Confirma el email nuevo. |
| `PATCH` | `/api/account/privacy` | Actualiza visibilidad y preferencia de mensajes. |
| `GET` | `/api/account/export` | Descarga los datos personales en JSON. |
| `POST` | `/api/account/deactivate` | Desactiva la cuenta durante 30 dias. |
| `POST` | `/api/account/reactivate` | Reactiva una cuenta dentro del periodo permitido. |
| `POST` / `GET` | `/api/support/tickets` | Crea y lista los tickets propios. |

### Variables y tareas operativas

Configura estas variables en cada entorno de ejecucion; nunca las subas al repositorio:

```env
ACCOUNT_PURGE_JOB_TOKEN=<token-aleatorio-de-al-menos-32-caracteres>
NODEMAILER_EMAIL=<cuenta-smtp>
NODEMAILER_TOKEN=<credencial-smtp>
GOOGLE_CLIENT_ID=<cliente-oauth>
GOOGLE_CLIENT_SECRET=<secreto-oauth>
```

El workflow `.github/workflows/account-purge.yml` llama diariamente a `/api/admin/account-purge`. En GitHub Actions, `ACCOUNT_PURGE_JOB_TOKEN` debe coincidir exactamente con el entorno de la aplicacion.

### Entrega de imagenes de Cloudinary

Las fotos se muestran mediante `/api/media/posts/:id`. La ruta entrega las cargas publicas y genera una URL firmada para las fotos migradas a entrega autenticada. Esto mantiene visibles las publicaciones antiguas despues de migrarlas; no se deben editar manualmente las URLs guardadas en `imagen`.

Antes de migrar assets legacy ejecuta el modo de simulacion y revisa el resultado. El comando `:apply` cambia el tipo de entrega en Cloudinary y es idempotente:

```bash
npm run moderation:migrate-media:check
npm run moderation:migrate-media:apply
```

### Validacion

```bash
npm test
npm run lint
npm run build
npm run account:smoke
```
