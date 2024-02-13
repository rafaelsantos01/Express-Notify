
FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

CMD ["npm", "run", "start:prod"]