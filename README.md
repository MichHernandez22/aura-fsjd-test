Aura User Management System
## Descripción General
Sistema completo de gestión de usuarios con autenticación JWT, desarrollado como prueba técnica para una posición de Full Stack JavaScript Developer. Incluye backend API REST con Node.js/TypeScript y frontend moderno con React/Vite.

## Arquitectura del Proyecto
aura-user-management/
├── backend/           # API REST con Node.js + Express + TypeScript + PostgreSQL
├── frontend/          # Aplicación React con Vite + TypeScript + Tailwind CSS

## Características Principales

### Backend
- **API RESTful con autenticación JWT
- **PostgreSQL + TypeORM con migraciones
- **Validación de datos con class-validator
- **Arquitectura modular y escalable
- **Manejo centralizado de errores
- **CORS configurado para múltiples orígenes
- **Deploy automatizado en Railway

### Frontend
-React 18 con TypeScript y Vite
-Tailwind CSS 4 para estilos
-Autenticación con contexto React
-Formularios con react-hook-form y validación Yup
-Routing protegido con React Router
-Deploy automatizado en Vercel

## Tecnologías Utilizadas

### Backend
Node.js v18+ - Entorno de ejecución
TypeScript - Tipado estático
Express - Framework web
PostgreSQL - Base de datos relacional
TypeORM - ORM para TypeScript
JWT - Autenticación por tokens
bcryptjs - Hash de contraseñas
class-validator - Validación de datos
Railway - Plataforma de deploy

### Frontend
React 18 - Biblioteca UI
TypeScript - Tipado estático
Vite - Bundler y dev server
Tailwind CSS 4 - Framework CSS
React Router v6 - Navegación
React Hook Form - Manejo de formularios
Axios - Cliente HTTP
Lucide React - Iconografía
Vercel - Plataforma de deploy

## Despliegue Rápido

### Backend en Railway
Conectar repositorio a Railway
Configurar PostgreSQL automáticamente
Configurar variables de entorno
Deploy automático con cada push

### Frontend en Vercel
Conectar repositorio a Vercel
Configurar variables de entorno (API_URL)
Deploy automático con cada push

## API Documentation
### Endpoints Principales
Autenticación
POST /api/auth/register - Registrar nuevo usuario
POST /api/auth/login - Iniciar sesión

Usuarios (requieren autenticación)
GET /api/users/profile - Obtener perfil del usuario
PUT /api/users/profile - Actualizar perfil
GET /api/users - Listar todos los usuarios

## Desarrollo Local
### Prerrequisitos
Node.js v18 o superior
PostgreSQL v12 o superior
npm

## Configuración Backend
cd backend
npm install
cp .env.example .env
npm run dev

## Configuración Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev

## URLs de Producción
Frontend: https://aura-fsjd-test-yywi.vercel.app/
Backend: https://aura-fsjd-test-production.up.railway.app/

## Decisiones Técnicas
### Backend
TypeScript para mayor seguridad y mantenibilidad
TypeORM por su integración con TypeScript
Arquitectura modular para escalabilidad
Migrations para control de cambios en BD
JWT por ser stateless y escalable

### Frontend
Vite por velocidad
Tailwind CSS 4 por utilidad y rendimiento
Context API en lugar de Redux para simplicidad
React Hook Form para formularios eficientes

### Seguridad
Passwords hasheadas con bcrypt
JWT con expiración configurable
CORS restringido a dominios permitidos
Validación de datos en backend y frontend

## Mejoras Futuras
### Backend
Tests unitarios e integración
Rate limiting
Refresh tokens
Verificacion de email
Recuperacion de password

### Frontend
Tests con React Testing Library
Internacionalización (i18n)
Dark mode
