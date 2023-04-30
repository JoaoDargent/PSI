# PSI_G31_2223

Projeto relativo à cadeira de PSI de 2022/2023


## Frontend Server

Na pasta frontend introduzir o comando no terminal `ng serve --open` para iniciar o frontend server (i.e., Angular). O url do servidor é `http://localhost:4200/`. 

## Backend Server

Na pasta backend introduzir o comando no powershell `$ENV:DEBUG = "psi031:*"; npm start` para iniciar o servidor backend  (i.e., Angular). O url do servidor é `http://localhost:3000/`. 

## Database

https://cloud.mongodb.com/v2/6423c74fcfabca1c72c367eb#/clusters

## AppServer

O appserver reinicia todos os dias, por isso os processos que lançarem da forma indicada ontem terão de ser lançados todos os dias. Se quiserem evitar isso, fica aqui a descrição de uma terceira maneira de manter os servidores a correr.

Maneira 3

Instalar o PM2: 
npm install pm2

Iniciar cada servidor usando o pm2. O pm2 irá lançar o processo de cada vez que ele morrer (portanto, mesmo que o servidor reinicie, o pm2 volta a lançar o processo).
Por exemplo:
./node_modules/pm2/bin/pm2 start "npm start"

Para verem os processos lançados podem usar o comando:
./node_modules/pm2/bin/pm2 list

Para apagar um processo da lista de processos geridos pelo pm2, usar:
./node_modules/pm2/bin/pm2 delete id
em que id é o id do processo como consultado na lista de processos lançados.

Para pararem todos, podem usar:
./node_modules/pm2/bin/pm2 delete all
