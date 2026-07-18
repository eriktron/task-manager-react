// Este archivo CARGA las variables de .env con dotenv y PASAR la URL a PRISMA
import { defineConfig } from "prisma/config"; 
import dotenv from "dotenv"; 

dotenv.config();  

export default defineConfig({
  migrations: {
    // 👇 Esto le dice a Prisma exactamente qué comando ejecutar al hacer el seed
    seed: 'node prisma/seed.js',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});