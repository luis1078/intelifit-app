# IteliFit — Fitness Coaching App

Prototipo funcional de una aplicación móvil de entrenamiento personal con coaching asistido por IA, desarrollado como proyecto del curso de Experiencia de Usuario (UX) — USIL, Facultad de Ingeniería e Inteligencia Artificial.

El proyecto está basado en el caso de estudio de **Steffany Solano**, entrenadora personal con modalidad híbrida (presencial y online), y busca resolver un problema real: que las usuarias puedan interpretar sus evaluaciones físicas, hacer seguimiento de su progreso y gestionar sus reservas de clases sin depender de asistencia constante de la entrenadora.

Diseñado originalmente en [Figma Make](https://www.figma.com/design/J9o6XuejWfDOVvKtDAlYbJ/Fitness-Coaching-App-Wireframes) y desarrollado en código como un prototipo navegable con React + TypeScript.

## Características principales

- **17 pantallas** completamente navegables: landing, registro en 3 pasos, login, recuperación de contraseña, pago, dashboard, progreso, reserva de clases, mis reservas, rutinas, reporte de evaluación, chat con agente IA, perfil, notificaciones, política de privacidad y ayuda
- **Bilingüe** (Español / Inglés) con cambio de idioma en tiempo real
- **Validación de formularios** con mensajes de error específicos por campo
- **Sticky forms**: los datos no sensibles persisten en `localStorage` ante recargas accidentales
- **Indicador de fuerza de contraseña** en tiempo real durante el registro
- **Simulación de errores de red** con opción de reintentar, en los formularios críticos (login, registro, pago)
- **Login social simulado** (Google / Apple)
- **Sistema de reservas en memoria**: reservar, cancelar y listar clases sin necesidad de backend
- **Agente IA simulado** con respuestas dinámicas en el chat

## Stack técnico

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) como bundler
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) + componentes propios estilo shadcn/ui
- [Recharts](https://recharts.org/) para las gráficas de progreso
- [Lucide React](https://lucide.dev/) para iconografía

## Cómo correr el proyecto

\`\`\`bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
\`\`\`

Esto levanta el proyecto en \`http://localhost:5173/\` (o el puerto que indique la terminal). Abre esa URL en tu navegador para ver el prototipo.

Para generar una build de producción:

\`\`\`bash
npm run build
\`\`\`

## Estructura del proyecto

\`\`\`
src/
├── app/
│   ├── components/      # Pantallas y componentes de la aplicación
│   │   └── ui/           # Componentes base reutilizables (botones, inputs, etc.)
│   ├── hooks/            # Hooks personalizados (persistencia, validación, red)
│   ├── utils/            # Validadores y funciones de formato
│   ├── App.tsx           # Enrutador principal y selector de pantallas
│   └── translations.ts   # Textos en español e inglés
├── img/                  # Assets e imágenes
├── styles/                # Estilos globales y configuración de Tailwind
└── main.tsx               # Punto de entrada de la aplicación
\`\`\`

## Notas del prototipo

Este es un prototipo de **frontend únicamente**, sin backend real. Las acciones como reservar una clase, registrarse o procesar un pago están simuladas con estado local de React (\`useState\`) y no persisten más allá de la sesión del navegador, salvo los datos no sensibles que se guardan temporalmente en \`localStorage\` para mejorar la experiencia ante recargas accidentales.

## Origen del proyecto

Diseño original creado con [Figma Make](https://www.figma.com/design/J9o6XuejWfDOVvKtDAlYbJ/Fitness-Coaching-App-Wireframes) y desarrollado en código para fines académicos.