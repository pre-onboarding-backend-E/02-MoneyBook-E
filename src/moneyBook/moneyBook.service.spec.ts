import { Test, TestingModule } from '@nestjs/testing';
import { MoneyBookService } from './moneyBook.service';
import { uuid } from 'uuidv4';

class MockMoneyBookRepositoy {
  mydb = [
    {
      id: 'moneyBookId',
      money: 1500,
      type: '1',
      total: 35000,
      description: '새우깡 구매',
      user: 'userId',
    },
  ];

  findOne({ id }) {
    this.mydb.filter((el) => el.id === id);
  }

  save({ money, type, total, description }) {
    const moneyBookId: string = uuid();
    this.mydb.push({ id: moneyBookId, money, type, total, description });
  }
}

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
