# DEVELOPMENT ENVIRONMENT
FROM node:18 as development

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install --only=development

COPY . .

RUN npm run build

CMD [ "node", "dist/main"]