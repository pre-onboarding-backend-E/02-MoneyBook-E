import { Test, TestingModule } from '@nestjs/testing';
import { MoneyBookController } from './moneyBook.controller';

describe('MoneyBooksController', () => {
  let controller: MoneyBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyBookController],
    }).compile();

    controller = module.get<MoneyBookController>(MoneyBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
