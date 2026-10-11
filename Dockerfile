# Runtime alinhado com a API (node:22-alpine). O Node 18 esta fora de suporte desde
# abril de 2025.
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# npm ci (e nao npm install) porque o package-lock.json esta versionado: a instalacao
# fica reproduzivel e falha alto se o lock sair de sincronia com o package.json.
RUN npm ci

COPY . .

ENV NODE_ENV=development

EXPOSE 3000
EXPOSE 9230

CMD ["npm", "run", "dev", "--", "--turbopack"]
