FROM node:20-alpine

WORKDIR /api
COPY package.json package-lock.json prisma tsconfig.json ./
COPY src ./src

RUN apk add --no-cache openssl
RUN npm ci
RUN npx tsc --outDir dist
RUN npm prune --omit=dev

RUN rm -rf src tsconfig.json package-lock.json package.json schema.prisma

USER node
CMD ["node", "dist/index.js"]