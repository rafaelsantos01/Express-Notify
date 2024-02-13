# Express Notify

O projeto NestJS consiste em uma aplicação dedicada ao envio de comunicações para clientes, utilizando Node.js. Por meio de controladores e serviços específicos, o sistema gerencia o envio de emails. Organizado em módulos distintos para cada tipo de comunicação, integra-se com provedores de serviços externos para garantir eficiência e confiabilidade.

# API

```js
    POST /send/email
    {
        "title":"Recuperação de senha",
        "email":"email@email",
        "content":"email"
    }
```
