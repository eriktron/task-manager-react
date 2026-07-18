// backend/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const dotenv = require('dotenv');

// 1. Cargar las variables de entorno del archivo .env
dotenv.config();

// 2. Configurar el Driver Adapter compatible con Prisma 7.7
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// 3. Inicializar PrismaClient pasándole el adaptador requerido
const prisma = new PrismaClient({ adapter });

async function main() {
  // El código de lógica del profesor permanece 100% idéntico y reproducible
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Tarea de ejemplo para pruebas',
      completed: false,
    },
  });
  
  console.log('¡Base de datos sembrada con éxito!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end(); // Cerramos el pool de conexiones de pg
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });