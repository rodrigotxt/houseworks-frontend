# frontend/Dockerfile

# Usamos a imagem base Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração de dependências
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências do projeto
# (Isso será executado apenas se package.json ou package-lock.json mudarem)
RUN npm install

# Copia o restante do código-fonte para o contêiner
# (O volume mount no docker-compose.yml irá sobrescrever isso para desenvolvimento)
COPY . .

# Define a porta que o servidor de desenvolvimento do React escutará
ENV PORT 3000
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento do React
# Este comando habilita o hot reload e a recarga ao vivo
CMD ["npm", "start"]
