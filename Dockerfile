# frontend/Dockerfile

# Usamos a imagem base Node.js, recomendada para desenvolvimento Next.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração de dependências
# A ordem é importante para o cache do Docker:
# Se package.json ou package-lock.json mudarem, o Docker refaz o npm install
COPY package.json ./
COPY package-lock.json ./
# Se você usa Yarn e tem yarn.lock, use: COPY yarn.lock ./

# Instala as dependências do projeto
# O --force é útil em algumas situações para resolver conflitos de dependências,
# mas use com cautela em produção. Para dev, é aceitável se necessário.
RUN npm install --force

# Copia o restante do código-fonte da sua aplicação Next.js para o contêiner
# Durante o desenvolvimento com volumes, esta cópia será sobrescrita/sincronizada
# com o seu código local, permitindo o hot reload.
COPY . .

# Expõe a porta padrão do servidor de desenvolvimento do Next.js (3000)
# Esta é a porta interna do contêiner que será mapeada no docker-compose.yml
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento do Next.js
# 'npm run dev' inicia o Next.js em modo de desenvolvimento,
# que inclui o hot reload e a recarga ao vivo quando arquivos são alterados.
CMD ["npm", "run", "dev"]
