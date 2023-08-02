FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD npm run start

# FROM node:18-alpine as builder
# ADD . /app
# WORKDIR /app
# RUN npm install
# RUN npm run build

# FROM node:18-alpine as runner
# WORKDIR /app
# COPY package*.json /app
# COPY --from=builder /app/dist /app
# EXPOSE 4000
# CMD npm run start:prod
