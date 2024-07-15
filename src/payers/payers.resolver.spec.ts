import { Test, TestingModule } from '@nestjs/testing';
import { PayersResolver } from './payers.resolver';

describe('PayersResolver', () => {
  let resolver: PayersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayersResolver],
    }).compile();

    resolver = module.get<PayersResolver>(PayersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
