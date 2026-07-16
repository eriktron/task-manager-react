# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Instalamos todas las dependencias necesarias
RUN npm ci

COPY . .

# Generamos el cliente de Prisma
RUN npx prisma generate

EXPOSE 3000

# Arrancamos usando ts-node directamente en el contenedor
CMD ["npx", "ts-node", "src/index.ts"]