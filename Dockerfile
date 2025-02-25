# FROM node:23-alpine
# EXPOSE 3000

# COPY db.json /opt/db.json

# RUN yarn global add json-server

# CMD ["json-server", "--host", "0.0.0.0", "/opt/db.json"]



# FROM node:23-alpine

# RUN corepack enable && yarn set version stable

# COPY package.json yarn.lock ./

# RUN yarn install

# COPY db.json /opt/db.json

# EXPOSE 3000

# CMD ["npx", "json-server", "--watch", "db.json", "--port", "3000"]


FROM node:18-alpine

WORKDIR /app

RUN npm install -g json-server

COPY db.json /app/db.json

EXPOSE 5000

CMD ["npx", "json-server", "--host", "0.0.0.0", "/app/db.json", "--port", "5000"]