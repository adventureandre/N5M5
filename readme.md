# Missão Prática | Software sem segurança não serve

## RPG0035 - SOFTWARE SEM SEGURANÇA NÃO SERVE!

Implementação de uma API segura utilizando Node.js e Express feita do zero, com foco na prevenção de vulnerabilidades como injeção de SQL e gerenciamento de sessões.

## Objetivos da Prática

- Descrever o controle básico de acesso a uma API Rest.
- Prevenir ataques de acesso não autorizado utilizando tokens protegidos/atualizados.
- Tratar injeção de SQL em códigos-fonte.
- Tratar injeção de CRLF em códigos-fonte.
- Prevenir ataques do tipo CSRF em sistemas web.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express

## Pré-requisitos

- Node.js
- npm ou yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/adventureandre/N5M5.git
cd N5M5
```
2. Renome o .env.exemple para .env é instale as dependências

```bash
    npm install
```
```bash
   mv .env.example .env
```
A aplicação estará disponível em http://localhost:3333.

## Endpoints da API
### Autenticação de Usuário

Login

```bash
   curl -X POST http://localhost:3333/auth/login -H "Content-Type: application/json" -d '{
  "username": "admin",
  "password": "123456789"
}'
```
Obter Dados do Usuário Autenticado
```bash
 curl -X GET http://localhost:3333/auth/me -H "Authorization: Bearer <token>"
```

Listar Usuários
```bash
curl -X GET http://localhost:3000/users -H "Authorization: Bearer <token>"
```

### Contratos

Listar Contratos
```bash
curl -X POST http://localhost:3000/contracts -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{
  "empresa": "Empresa A",
  "inicio": "2024-01-01"
}'
```


## Credits

- [André Luíz F Souza](https://github.com/adventureandre) (Developer)
- [ADVENTUREANDRE](https://www.linkedin.com/in/adventureandre) (Linkedin)
- [Adventure.dev.br](https://adventure.dev.br) (Site)

## License

The MIT License (MIT). Please see [License File](https://github.com/adventureandre/Lib/blob/main/LICENSE) for more information.
