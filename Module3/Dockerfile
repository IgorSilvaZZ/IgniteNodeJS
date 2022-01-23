##Imagem que eu quero baixar no container
FROM node 

##Diretorio onde vou criar para colocar os arquivos que vou utilizar
WORKDIR /usr/app

##Copiando o package.json para o dentro ./usr/app
COPY package.json ./

##Executar comando para instalar as dependencias do projeto no container
RUN npm install

##Copiando tudo que foi instalado e criado para dentro do workdir
COPY . .

##Liberar a porta 3333 para o nosso container
EXPOSE 3333

##Permite comandos bash dentro do container
CMD ["npm", "run", "dev"]