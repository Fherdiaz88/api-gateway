import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('chat')
export class ChatController {
  constructor(@Inject('CHAT_SERVICE') private client: ClientProxy) {}

  @Post()
  async sendMessage(@Body() body: { user: string; message: string }) {
    this.client.emit('chat_message', body);
    return { status: 'sent' };
  }
}
