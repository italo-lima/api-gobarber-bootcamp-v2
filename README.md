# API GoBarber 

:star: API desenvolvida com Typescript + SOLID + DDD + Docker + Postgres + TypeOrm

:arrow_right: Status: Development :warning:

:triangular_flag_on_post: Descrição: API para realizar gerenciamento de agendamentos para barbearia

# :arrow_forward: Como iniciar Aplicação

No terminal, navegue até o endereço no qual deseja salvar o projeto e clone utilizando a url abaixo

`git clone https://github.com/italo-lima/api-gobarber-bootcamp-v2.git`

Entre na pasta do projeto

`cd api-go-barber`

Instale as dependências do projeto

`yarn` ou `npm install`

Execute aplicação

`yarn dev:server` ou `npm start dev:server`

Pronto, agora é possível conectar API utilizando [LocalHost](http://localhost:3333 "API GoBarber") na porta 3333.

# :twisted_rightwards_arrows: Rotas da Aplicação

## Appointments 

`GET /appointments` - Retorna todos os appointments cadastrado.

`POST /appointments` - Cria um novo appointment.

#### Body example:

```
{
	"provider_id": "fd8edb9d-e4db-437f-8e79-188d9971bd4c",
	"date": "2020-07-01T03:00:00"
}
```

## Users 

`POST /users` - Cria um novo usuário.

#### Body example:

```
{
	"name": "Ítalo",
	"email": "italo@email.com",
	"password": "123456"
}
```
