import { Test, TestingModule } from '@nestjs/testing';
import { Page } from './page.entity';
import { PageProvider } from './page.service';

describe('Page', () => {
  let provider: PageProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageProvider],
    }).compile();

    provider = module.get<PageProvider>(PageProvider);
  });

  it('module should be defined', () => {
    expect(new Page()).toBeDefined();
  });
  it('provider should be defined', () => {
    expect(provider).toBeDefined();
  });
});
