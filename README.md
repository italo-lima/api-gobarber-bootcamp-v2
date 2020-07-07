# API GoBarber 

:star: API desenvolvida com Typescript + SOLID + DDD + Docker + Postgres + TypeOrm

:arrow_right: Status: Development :wrench:

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

# :page_facing_up: Tabela de descrição das rotas

| Módulo      | Rota                                      |    Tipo     |  Autenticação?     | Descrição                                                    |
|:-----------:|:-----------------------------------------:|:-----------:|:------------------:|:------------------------------------------------------------:|
| Usuário     | /users                                    |  POST       |    :x:             | Cria um novo usuário                                         |
| Usuário     | /users/password/forgot                    |  POST       |    :x:             | Solicita recuperação por email                               |
| Usuário     | /users/password/reset                     |  POST       |    :x:             | Realiza atualização da senha com token recebido no e-mail    |
| Usuário     | /users/avatar                             |  PATCH      | :heavy_check_mark: | Atualiza o avatar do usuário                                 |
| Usuário     | /profile                                  |  GET        | :heavy_check_mark: | Retorna informações do usuário logado                        |
| Usuário     | /profile                                  |  PUT        | :heavy_check_mark: | Atualiza informações do usuário logado (email, password,name)|
| Usuário     | /sessions                                 |  POST       |    :x:             | Cria uma sessão para um usuário                              |
| Agendamento | /appointments                             |  POST       | :heavy_check_mark: | Cria um agendamento para usuário logado                      |
| Agendamento | /appointments/me                          |  GET        | :heavy_check_mark: | Retorna todos agendamentos do prestador logado               |
| Provedores  | /providers                                |  GET        | :heavy_check_mark: | Retorna todos provedores de serviço exceto usuário logado    |
| Provedores  | /providers/provider_id/month-availability |  GET        | :heavy_check_mark: | Retorna os dias do mês com vagas para serviço                |
| Provedores  | /providers/provider_id/day-availability   |  GET        | :heavy_check_mark: | Retorna os horários do dia com vagas para serviço            |

# :twisted_rightwards_arrows: Rotas da Aplicação

## Authentication

:paperclip: `POST /sessions`.

#### Body example:

```
{
  "email": "italo@email.com",
  "password": "123456"
}
```

#### Body response:

```
{
  "user": object,
  "token": string
}
```

## Users 

:paperclip: `POST /users`.

#### Body example:

```
{
  "name": "Ítalo",
  "email": "italo@email.com",
  "password": "123456"
}
```

#### Body response:

```
{
  "id": uuid,
  "name": string,
  "email": string,
  "created_at": Date,
  "updated_at": Date
}
```

:paperclip: `PATCH /users/avatar`.

#### Body example:

```
Envio do tipo MultiPart

"avatar": "photo.png",
```

#### Body response:

```
{
  "id": uuid,
  "name": string,
  "email": string,
  "avatar": string,
  "created_at": Date,
  "updated_at": Date
}
```

:paperclip: `POST /password/forgot`.

#### Body example:

```
{
  "email": "italojonas@hotmail.com"
}
```

:paperclip: `POST /password/reset`.

#### Body example:

```
{
  "password": "123123",
  "token": "ac8eej9d-e4db-437f-8e79-188d9971bc8e"
}
```

## Perfil 

:paperclip: `GET /profile`.

#### Body example:

```
{
  "id": uuid,
  "name": string,
  "email": string,
  "avatar": string,
  "created_at": Date,
  "updated_at": Date
}
```

:paperclip: `PUT /profile`.

#### Body example:

```
{
  "name": "Ítalo",
  "password": "123456",
  "old_password": "123123"
}
```

#### Body response:

```
{
  "id": uuid,
  "name": string,
  "avatar": string,
  "created_at": Date,
  "updated_at": Date
}
```

## Appointments 

:paperclip: `GET /appointments/me`.

#### Body response:

``` Appointments[] || {} ```

:paperclip: `POST /appointments`.

#### Body example:

```
{
  "provider_id": "fd8edb9d-e4db-437f-8e79-188d9971bd4c",
  "date": "2020-07-01T03:00:00"
}
```

#### Body response:

```
{
  "provider_id": uuid,
  "date": Date,
  "id": uuid,
  "created_at": Date,
  "updated_at": Date
}
```

## Providers 

:paperclip: `GET /providers`.

#### Body response:

``` User[] || [] ```

:paperclip: `GET /providers/provider_id/month-availability`.

#### Body example:

```
{
  "year": 2020,
  "month": 7
}
```

#### Body response:

``` 
[
  {
    "day": 1,
    "available": true
  },
  {
    "day": 2,
    "available": true
  },
  .
  .
  .
 ]
```

:paperclip: `GET /providersprovider_id/day-availability`.

#### Body example:

```
{
  "year": 2020,
  "month": 7,
  "day": 7
}
```

#### Body response:

``` 
[
  {
    "hour": 8,
    "available": false
  },
  {
    "hour": 9,
    "available": false
  },
  .
  .
  .
 ]
```
