import { Test, TestingModule } from '@nestjs/testing';
import { MoneyBookService } from './moneyBook.service';

describe('MoneyBooksService', () => {
  let service: MoneyBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyBookService],
    }).compile();

    service = module.get<MoneyBookService>(MoneyBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
