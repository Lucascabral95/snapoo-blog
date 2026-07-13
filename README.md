<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React Logo" width="180"/>
</p>

# Snapoo Blog

## DescripciÃ³n general

**Snapoo Blog** es una red social de fotografÃ­a desarrollada en Next.js y TypeScript, donde los usuarios pueden crear perfiles, compartir imÃ¡genes, interactuar y descubrir contenido visual. El proyecto implementa arquitectura modular, autenticaciÃ³n segura, almacenamiento en la nube y una UI moderna y responsiva con SCSS y Tailwind CSS.

---

## âš™ï¸ CaracterÃ­sticas Principales

- **AutenticaciÃ³n y AutorizaciÃ³n:** Inicio de sesiÃ³n con Google/email, gestiÃ³n de sesiones seguras con NextAuth.js.
- **GestiÃ³n de ImÃ¡genes:** Subida, manipulaciÃ³n y almacenamiento eficiente en Cloudinary.
- **Perfiles de Usuario:** VisualizaciÃ³n de fotos propias, reposts y detalles de usuario.
- **InteracciÃ³n Social:** Likes, reposts y comentarios en publicaciones.
- **Feed DinÃ¡mico:** Descubrimiento de contenido, bÃºsqueda y filtrado avanzado.
- **UI Responsive:** DiseÃ±o profesional tipo masonry, animaciones suaves y experiencia optimizada en mobile.
- **GestiÃ³n de Errores y Feedback:** Manejo global de errores y notificaciones contextuales.
- **OptimizaciÃ³n de Performance:** SSR, lazy loading y caching inteligente con Next.js.
- **Seguridad:** ValidaciÃ³n de datos y protecciÃ³n de rutas.
- **Testing Extensivo:** Pruebas unitarias y de integraciÃ³n.
- **DocumentaciÃ³n:** DocumentaciÃ³n clara de la API y componentes.

---

## ðŸš€ TecnologÃ­as Utilizadas

- **Framework:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos:** [MongoDB](https://www.mongodb.com/)
- **GestiÃ³n de Estado:** React Context
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/), [SCSS](https://sass-lang.com/)
- **AutenticaciÃ³n:** [NextAuth.js](https://next-auth.js.org/), [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- **Media:** [Cloudinary](https://cloudinary.com/)
- **ValidaciÃ³n:** [Zod](https://zod.dev/)
- **Testing:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting & Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

---

## Tabla de contenidos

- [InstalaciÃ³n](#instalaciÃ³n)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## InstalaciÃ³n

1. **ClonÃ¡ el repositorio:**

```bash
git clone https://github.com/Lucascabral95/snapoo-blog.git
cd snapoo
```

2. **InstalÃ¡ las dependencias:**

```bash
npm install
```

3. **ConfigurÃ¡ las variables de entorno:**

```bash
cp .env.template .env.local
```

4. **CompilÃ¡ el proyecto:**

```bash
npm run dev
```

## Uso

La aplicaciÃ³n estarÃ¡ disponible en:

`http://localhost:3000`

## Estructura del proyecto

```bash
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ api/                  # Rutas de API
â”‚   â”‚   â”œâ”€â”€ feed/                 # Feed principal y subrutas
â”‚   â”‚   â”œâ”€â”€ usuario/              # Perfil de usuario
â”‚   â”‚   â”œâ”€â”€ posteo/               # Detalle de posteos
â”‚   â”‚   â”œâ”€â”€ fonts/                # Fuentes personalizadas
â”‚   â”‚   â”œâ”€â”€ globals.css           # Estilos globales
â”‚   â”‚   â”œâ”€â”€ layout.tsx            # Layout principal
â”‚   â”‚   â””â”€â”€ page.tsx              # PÃ¡gina de inicio
â”‚   â”œâ”€â”€ DAO/                      # Acceso a datos
â”‚   â”œâ”€â”€ infrastructure/           # ConfiguraciÃ³n, interfaces, servicios
â”‚   â”œâ”€â”€ models/                   # Modelos de datos
â”‚   â”œâ”€â”€ presentation/             # Componentes de UI
â”‚   â””â”€â”€ services/                 # LÃ³gica de negocio
â”œâ”€â”€ public/                       # Assets estÃ¡ticos
â”œâ”€â”€ .eslintrc.js                  # ConfiguraciÃ³n de ESLint
â”œâ”€â”€ next.config.js                 # ConfiguraciÃ³n de Next.js
â”œâ”€â”€ package.json                  # Dependencias y scripts
â”œâ”€â”€ tailwind.config.js            # ConfiguraciÃ³n de Tailwind
â”œâ”€â”€ tsconfig.json                 # ConfiguraciÃ³n de TypeScript
â””â”€â”€ README.md                     # DocumentaciÃ³n
```

## Moderacion y seguridad de la comunidad

Snapoo incluye un sistema de moderacion manual para proteger a la comunidad y administrar contenido denunciado.

### Roles

- `user`: puede publicar, comentar, denunciar y bloquear.
- `moderator`: puede revisar reportes, retirar contenido y suspender cuentas por 1, 7 o 30 dias.
- `admin`: puede resolver reportes, restaurar contenido, suspender cuentas por plazos personalizados y administrar roles.

Para definir el primer administrador, configurÃ¡ en `.env.local`:

```env
MODERATION_BOOTSTRAP_ADMIN_EMAIL="tu-email@example.com"
```

ReiniciÃ¡ Next.js y volvÃ© a iniciar sesiÃ³n con esa cuenta. El email se promueve automÃ¡ticamente a `admin`.

### Reportes y bloqueos

Los usuarios pueden denunciar posteos, comentarios y perfiles desde el detalle del posteo, los comentarios y los perfiles. TambiÃ©n pueden bloquear usuarios; el bloqueo oculta mutuamente sus perfiles, posteos y comentarios.

La cola administrativa estÃ¡ disponible en `/admin/moderation/reports`. La gestiÃ³n de roles estÃ¡ en `/admin/moderation/staff`.

Las medidas aplicadas quedan auditadas y generan notificaciones in-app para la cuenta afectada. El contenido retirado se conserva para permitir restauraciÃ³n y no se elimina automÃ¡ticamente de la base durante el perÃ­odo de retenciÃ³n.

### Migracion de imagenes de Cloudinary

Las nuevas publicaciones guardan el `publicId` de Cloudinary y se entregan mediante una ruta autenticada. Para migrar las imÃ¡genes existentes, asegurate de tener las variables de MongoDB y Cloudinary en `.env.local`.

Primero ejecutÃ¡ una simulaciÃ³n:

```bash
npm run moderation:migrate-media:check
```

RevisÃ¡ el JSON final (`migrated` y `skipped`). Si el resultado es correcto, aplicÃ¡ la migraciÃ³n:

```bash
npm run moderation:migrate-media:apply
```

La migraciÃ³n es idempotente: solo procesa publicaciones que todavÃ­a no tienen `cloudinaryPublicId`. HacÃ© una copia de seguridad de MongoDB y verificÃ¡ la cuenta de Cloudinary antes de usar el comando `:apply`.

### Configuracion requerida

AdemÃ¡s de las credenciales existentes, la moderaciÃ³n usa:

```env
MODERATION_BOOTSTRAP_ADMIN_EMAIL="tu-email@example.com"
MODERATION_RETENTION_DAYS=730
MAX_REPORTS_PER_HOUR=10
MEDIA_PRIVATE_DELIVERY_ENABLED=false
```

`MEDIA_PRIVATE_DELIVERY_ENABLED` se mantiene como bandera de despliegue; activala despuÃ©s de verificar la migraciÃ³n de assets.

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

Â¡Las contribuciones son bienvenidas! SeguÃ­ estos pasos:

1. HacÃ© un fork del repositorio.
2. CreÃ¡ una rama para tu feature o fix (`git checkout -b feature/nueva-funcionalidad`).
3. RealizÃ¡ tus cambios y escribÃ­ pruebas si es necesario.
4. HacÃ© commit y push a tu rama (`git commit -m "feat: agrega nueva funcionalidad"`).
5. AbrÃ­ un Pull Request describiendo tus cambios.

---

## Licencia

Este proyecto estÃ¡ bajo la licencia **MIT**.

---

## ðŸ“¬ Contacto

- **Autor:** Lucas Cabral
- **LinkedIn:** [https://www.linkedin.com/in/lucas-gastÃ³n-cabral/](https://www.linkedin.com/in/lucas-gastÃ³n-cabral/)
- **Portfolio:** [https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/](https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/)
- **Github:** [https://github.com/Lucascabral95](https://github.com/Lucascabral95/)

---

