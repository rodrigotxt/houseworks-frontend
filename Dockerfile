FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 3000
EXPOSE 9230

CMD ["npm", "run", "dev", "--", "--turbopack"]