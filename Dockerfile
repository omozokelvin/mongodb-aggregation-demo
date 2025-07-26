# ---- Build Stage ----
  FROM node:22-alpine AS builder

  WORKDIR /app
  
  COPY package*.json ./
  
  RUN npm install
  
  COPY . .
  
  RUN npm run build
  
  # ---- Development Stage ----
  FROM node:22-alpine AS development
  
  WORKDIR /app
  
  COPY package*.json ./
  
  RUN npm install
  
  COPY . .
  
  ARG PORT=4000
  ENV PORT=${PORT}
  EXPOSE ${PORT}
  
  CMD ["npm", "run", "start:dev"]
  
  # ---- Production Stage ----
  FROM node:22-alpine AS production
  
  WORKDIR /app
  
  COPY --from=builder /app/package*.json ./
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/dist ./dist
  
  ARG PORT=4000
  ENV PORT=${PORT}
  EXPOSE ${PORT}
  
  CMD ["node", "dist/main.js"]