# Etapa 1: construir la aplicación con Node
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servir los archivos estáticos resultantes con Nginx
FROM nginx:alpine

# Copiamos los archivos compilados en la Etapa 1 al directorio por defecto de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx corre nativamente en el puerto 80
EXPOSE 80

# Mantiene a Nginx corriendo en primer plano para que el contenedor no se apague
CMD ["nginx", "-g", "daemon off;"]