FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN /bin/ash -c 'set -ex && \
   ARCH=`uname -m` && \
   if [ "$ARCH" == "aarch64" ]; then \
   echo "aarch64" && \
   apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python; \
   else \
   echo "x86_64"; \
   fi'


# Install dependencies based on the preferred package manager
RUN corepack enable pnpm && pnpm i &&  npm install -g --arch=x64 --platform=linux --libc=glibc sharp


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /usr/local/lib/node_modules/sharp /usr/local/lib/node_modules/sharp
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN /bin/ash -c 'set -ex && \
   ARCH=`uname -m` && \
   if [ "$ARCH" == "aarch64" ]; then \
   echo "aarch64" && \
   apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python; \
   else \
   echo "x86_64"; \
   fi'



# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp

RUN corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app



ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /usr/local/lib/node_modules/sharp /usr/local/lib/node_modules/sharp
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
