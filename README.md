# Task Manager ProMax - Erik Contreras

Aplicación de manejo, registro, control de tareas.

## Stack de Tecnologias
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Base de Datos: PostgreSQL + Prisma ORM
- Desplegado en: Vercel (Frontend) + Render (Backend - PostgreSQL)

## Prerequisitos
- Node.js (v24.14.1 o Actual)
- npm (v11.11.0)
- Visual Studio Code
- PostgreSQL (v9.24)
- Github

## Despliegue
Base de datos - Render
1.- Crear cuenta en render.com
2.- Crear Nuevo Postgres
3.- Copiar DATABASE_URL

Configurar Prisma
1.- En archivo .env
    Configurar DATABASE_URL = url_obtenida_de_render
2.- Ejecutar en consola carpeta Backend: 
    npx prisma migrate deploy

Backend - Render
1.- Crear nuevo: WEB Service
2.- Conectar repositorio de github
3.- En render configurar:
    Build: npm install
    Start: npm run dev
4



