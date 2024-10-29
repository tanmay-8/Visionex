
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install 

RUN npm install nodemon -g

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["nodemon", "app.js"]
