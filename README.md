<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React Logo" width="180"/>
</p>

# Snapoo Blog

## Descripción general

**Snapoo Blog** es una red social de fotografía desarrollada en Next.js y TypeScript, donde los usuarios pueden crear perfiles, compartir imágenes, interactuar y descubrir contenido visual. El proyecto implementa arquitectura modular, autenticación segura, almacenamiento en la nube y una UI moderna y responsiva con SCSS y Tailwind CSS.

---

## ⚙️ Características Principales

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

## 🚀 Tecnologías Utilizadas

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
├── src/
│   ├── app/
│   │   ├── api/                  # Rutas de API
│   │   ├── feed/                 # Feed principal y subrutas
│   │   ├── usuario/              # Perfil de usuario
│   │   ├── posteo/               # Detalle de posteos
│   │   ├── fonts/                # Fuentes personalizadas
│   │   ├── globals.css           # Estilos globales
│   │   ├── layout.tsx            # Layout principal
│   │   └── page.tsx              # Página de inicio
│   ├── DAO/                      # Acceso a datos
│   ├── infrastructure/           # Configuración, interfaces, servicios
│   ├── models/                   # Modelos de datos
│   ├── presentation/             # Componentes de UI
│   └── services/                 # Lógica de negocio
├── public/                       # Assets estáticos
├── .eslintrc.js                  # Configuración de ESLint
├── next.config.js                 # Configuración de Next.js
├── package.json                  # Dependencias y scripts
├── tailwind.config.js            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
└── README.md                     # Documentación
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

## 📬 Contacto

- **Autor:** Lucas Cabral
- **LinkedIn:** [https://www.linkedin.com/in/lucas-gastón-cabral/](https://www.linkedin.com/in/lucas-gastón-cabral/)
- **Portfolio:** [https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/](https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/)
- **Github:** [https://github.com/Lucascabral95](https://github.com/Lucascabral95/)

---
