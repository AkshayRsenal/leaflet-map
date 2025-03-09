FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run",  "dev"]

# CMD ["json-server", "--host", "0.0.0.0", "--watch", "db.json", "--port", "3004"]