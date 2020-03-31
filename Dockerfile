# Builder stage
FROM node:12.16.1 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY tsoa.json ./
COPY ./src ./
RUN npm ci --quiet && npm run build:all

# Production stage
FROM node:12.16.1-slim

WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
