# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS dependencies
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci && npx prisma generate

FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG DATABASE_URL=mysql://iic_user:iic_password@127.0.0.1:3306/iic_website
ARG JWT_SECRET=development-only-jwt-secret
ARG TWO_FACTOR_ENCRYPTION_KEY=development-only-two-factor-key

ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SITE_URL
ARG DATABASE_URL
ARG JWT_SECRET
ARG TWO_FACTOR_ENCRYPTION_KEY
ARG SUPPRESS_EXPECTED_DB_FALLBACK_LOGS=1
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV TWO_FACTOR_ENCRYPTION_KEY=${TWO_FACTOR_ENCRYPTION_KEY}
ENV SUPPRESS_EXPECTED_DB_FALLBACK_LOGS=${SUPPRESS_EXPECTED_DB_FALLBACK_LOGS}
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=${NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}

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
