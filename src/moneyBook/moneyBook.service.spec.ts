import { Test, TestingModule } from '@nestjs/testing';
import { MoneyBooksService } from './moneyBook.service';

describe('MoneyBooksService', () => {
  let service: MoneyBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyBooksService],
    }).compile();

    service = module.get<MoneyBooksService>(MoneyBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
