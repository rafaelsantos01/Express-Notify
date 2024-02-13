# Use a imagem Node.js LTS como base
FROM node:21

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências e defina-os
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código fonte para o contêiner
COPY . .

# Compile o código NestJS
RUN npm run build

# Exponha a porta em que a aplicação estará escutando
EXPOSE 3000

# Comando para iniciar a aplicação após o contêiner ser iniciado
CMD ["npm", "run", "start:prod"]