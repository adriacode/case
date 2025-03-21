# Usa uma imagem do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./ 

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Define a porta exposta
EXPOSE 3001

# Comando para iniciar o frontend
CMD ["npm", "run", "dev"]
