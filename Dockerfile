FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD [ "node", "build/index.js" ]
