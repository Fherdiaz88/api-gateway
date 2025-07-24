import { Controller, Post, Body } from '@nestjs/common';
import { GraphqlProxyService } from './graphql-proxy.service';

@Controller('autos')
export class GraphqlProxyController {
  constructor(private readonly proxyService: GraphqlProxyService) {}

  @Post()
  async handleQuery(@Body() body: { query: string; variables?: any }) {
    return this.proxyService.forwardQuery(body.query, body.variables);
  }
}
