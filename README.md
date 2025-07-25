# API Gateway con NestJS y Microservicios

Este proyecto implementa un API Gateway utilizando NestJS, que recibe peticiones HTTP y las reenvía a uno o varios microservicios (como un microservicio de chat o GraphQL).  
El tipo de transporte (TCP, Redis, etc.) se configura  mediante un archivo `.env`.



##  Estructura del proyecto

api-gateway/
│
├── src/
│ ├── chat/ # Lógica para conexión con microservicio de chat
│ ├── graphql-proxy/ # Lógica para conexión con GraphQL (opcional)
│ ├── app.controller.ts # Endpoint HTTP principal
│ ├── app.module.ts # Configura módulos y clientes
│ ├── app.service.ts # Lógica de reenvío según el microservicio
│ └── main.ts # Inicia el Gateway y el transporte dinámico
│
├── .env # Configuración del transporte (ej. TCP)
├── README.md # Este archivo
├── package.json
└── tsconfig.json





## Entregables

-  Código fuente del API Gateway (`src/` completo)
-  Archivo `.env` de ejemplo
-  Instrucciones detalladas de uso (ver más abajo)
-  Preparado para ser subido a un repositorio GitHub



##  Archivo `.env` de ejemplo ##

-Tipo de transporte que se usará (tcp, redis o nats)
TRANSPORT=tcp

#Configuración para TCP
TCP_HOST=127.0.0.1
TCP_PORT=3010

#Si se usa Redis (como alternativa)
#REDIS_HOST=localhost
#REDIS_PORT=6379

#Si se usa NATS (como otra opción)
#NATS_URL=nats://localhost:4222

## Cómo ejecutar el Gateway##
1. Instalar dependencias

npm install
2. Crear el archivo .env
Puedes usar el archivo .env de ejemplo anterior y personalizarlo según el transporte que vayas a probar.

3. Iniciar el Gateway

npm run start:dev
Asegúrate de que los microservicios (chat, graphql, etc.) estén también ejecutándose.

¿Cómo probarlo?
Puedes usar Postman para enviar mensajes al microservicio de chat a través del Gateway.

Endpoint disponible:
POST http://localhost:3000/chat

Body (JSON):


{
  "user": "Juan",
  "message": "Hola desde el Gateway"
}

-Resultado esperado
El microservicio de chat mostrará en su consola:

[Microservice] Juan: Hola desde el Gateway
Y el Gateway responderá:


{
  "status": "sent"

}

## Probar microservicio GraphQL de autos##
Endpoint disponible:

POST http://localhost:3000/autos
Headers:


Content-Type: application/json
Body (GraphQL Query):


{
  "query": "query GetAuto($id: Int!) { auto(id: $id) { id marca potencia } }",
  "variables": {
    "id": 1
  }
}
Este endpoint hace proxy de la solicitud al microservicio de autos que corre como un servidor GraphQL independiente. El API Gateway redirige internamente esta petición.

 Y para agregar un vehiculo:

{
  "query": "mutation CreateAuto($input: CreateAutoInput!) { createAuto(createAutoInput: $input) { id marca potencia } }",
  "variables": {
    "input": {
      "marca": "Toyota",
      "potencia": 110
    }
  }
}

## Probar microservicio de tiempo##

Hacemos un GET en postman y colocamos http://localhost:3000/time y nos deberia dar algo como esto: 

{
    "time": "2025-07-25T01:31:16.147Z"
}

#Tecnologías usadas
NestJS

@nestjs/microservices

Transporte por TCP (también puede ser Redis o NATS)

WebSockets (en microservicio de chat)

Postman para pruebas