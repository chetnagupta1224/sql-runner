# -------- Stage 1: Build the frontend --------
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

COPY . .
RUN npm run build


# -------- Stage 2: Serve using NGINX --------
FROM nginx:alpine

# Copy build files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a default nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
