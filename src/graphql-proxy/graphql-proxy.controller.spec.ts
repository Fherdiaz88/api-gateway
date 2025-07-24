import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlProxyController } from './graphql-proxy.controller';

describe('GraphqlProxyController', () => {
  let controller: GraphqlProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphqlProxyController],
    }).compile();

    controller = module.get<GraphqlProxyController>(GraphqlProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
