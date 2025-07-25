import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphqlProxyService } from './graphql-proxy/graphql-proxy.service';
import { GraphqlProxyController } from './graphql-proxy/graphql-proxy.controller';
import { ChatController } from './chat/chat.controller';
import * as dotenv from 'dotenv';

dotenv.config();


let clientConfig;

switch (process.env.TRANSPORT) {
  case 'TCP':
    clientConfig = {
      name: 'SERVICE',
      transport: Transport.TCP,
      options: {
        host: process.env.TCP_HOST,
        port: Number(process.env.TCP_PORT),
      },
    };
    break;
  case 'REDIS':
    clientConfig = {
      name: 'SERVICE',
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    };
    break;
  case 'NATS':
    clientConfig = {
      name: 'SERVICE',
      transport: Transport.NATS,
      options: {
        url: process.env.NATS_URL,
      },
    };
    break;
  default:
    throw new Error('Transporte no soportado');
}

let chatClient;

switch (process.env.CHAT_TRANSPORT) {
  case 'TCP':
    chatClient = {
      name: 'CHAT_SERVICE',
      transport: Transport.TCP,
      options: {
        host: process.env.CHAT_TCP_HOST,
        port: Number(process.env.CHAT_TCP_PORT),
      },
    };
    break;
  case 'REDIS':
    chatClient = {
      name: 'CHAT_SERVICE',
      transport: Transport.REDIS,
      options: {
        host: process.env.CHAT_REDIS_HOST,
        port: Number(process.env.CHAT_REDIS_PORT),
      },
    };
    break;
}

@Module({
  imports: [ClientsModule.register([clientConfig, chatClient])],
  controllers: [AppController, GraphqlProxyController, ChatController],
  providers: [GraphqlProxyService],
})
export class AppModule {}

