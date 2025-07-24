import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlProxyService } from './graphql-proxy.service';

describe('GraphqlProxyService', () => {
  let service: GraphqlProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlProxyService],
    }).compile();

    service = module.get<GraphqlProxyService>(GraphqlProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
