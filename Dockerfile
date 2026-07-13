# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS dependencies
WORKDIR /app

ENV DATABASE_URL=mysql://iic_user:iic_password@127.0.0.1:3306/iic_website

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci && npx prisma generate

FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV DATABASE_URL=mysql://iic_user:iic_password@127.0.0.1:3306/iic_website
ENV JWT_SECRET=development-only-jwt-secret
ENV TWO_FACTOR_ENCRYPTION_KEY=development-only-two-factor-key
ENV SUPPRESS_EXPECTED_DB_FALLBACK_LOGS=1

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate && npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules/bcryptjs ./node_modules/bcryptjs
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts/provision-admin.mjs ./scripts/provision-admin.mjs
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh

USER nextjs

EXPOSE 3000

CMD ["sh", "scripts/docker-entrypoint.sh"]
