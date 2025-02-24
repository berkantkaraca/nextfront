# # Base image for dependencies and build
# FROM node:18-alpine AS deps
# WORKDIR /app

# # Copy package files
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm ci

# # Builder stage
# FROM node:18-alpine AS builder
# WORKDIR /app

# # Copy dependencies and source code
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Build the application
# RUN npm run build

# # Production stage
# FROM node:18-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# # Create a non-root user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Copy necessary files from builder
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # Switch to non-root user
# USER nextjs

# # Expose port
# EXPOSE 3000

# # Set environment variables
# ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"

# # Start the application
# CMD ["node", "server.js"] 


# 1. Resmi Node.js image'ını kullan
FROM node:18-alpine AS builder

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# 4. Uygulamayı build et
COPY . .
RUN npm run build

# 5. Yeni bir image oluştur ve sadece gerekli dosyaları kopyala
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

# 6. Portu tanımla
EXPOSE 3000

# 7. Next.js uygulamasını başlat
CMD ["npm", "run", "start"]