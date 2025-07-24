import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('SERVICE') private client: ClientProxy) {}

  @Get('time')
  getTime() {
    return this.client.send({ cmd: 'get_time' }, {});
  }
}
