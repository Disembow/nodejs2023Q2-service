FROM node:18.17.0-alpine3.17
WORKDIR /usr/dist
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]