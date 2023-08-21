FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
COPY prisma prisma
RUN npm install --omit=dev
EXPOSE 4000
CMD npx prisma generate && npx prisma migrate deploy && npm run start:dev
