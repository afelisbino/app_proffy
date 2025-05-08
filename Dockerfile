# Etapa 1: Instalar dependências
FROM node:20-alpine AS deps
WORKDIR /app

# lib necessária para compatibilidade com alguns pacotes
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Nenhum lockfile encontrado." && exit 1; \
  fi

# Etapa 2: Build da aplicação
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilita a telemetria
ENV NEXT_TELEMETRY_DISABLED=1

# Build otimizado standalone
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Nenhum lockfile encontrado." && exit 1; \
  fi

# Etapa 3: Imagem final de produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Cria usuário de execução
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copia apenas o necessário da build standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Ajusta permissões
USER nextjs

EXPOSE 3333

CMD ["node", "server.js"]
