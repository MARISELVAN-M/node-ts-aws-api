# Stage 1: Build the TypeScript code
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run production bundle
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
# Copy only the compiled javascript files from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENV PORT=3000

CMD ["node", "dist/server.js"]
