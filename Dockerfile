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
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
