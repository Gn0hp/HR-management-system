FROM node:20 as build

WORKDIR /app/src

COPY package*.json ./

RUN npm install

RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]