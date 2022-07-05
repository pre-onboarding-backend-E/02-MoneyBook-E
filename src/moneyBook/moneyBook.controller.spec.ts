import { Test, TestingModule } from '@nestjs/testing';
import { MoneyBookController } from './moneyBook.controller';
import { MoneyBookService } from './moneyBook.service';

describe('MoneyBooksController', () => {
  let moneyBookController: MoneyBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyBookController],
      providers: [MoneyBookService],
    }).compile();

    moneyBookController = module.get<MoneyBookController>(MoneyBookController);
  });

  describe('modifyOne', () => {
    it('result', () => {
      const result = moneyBookController.modifyOne();
      expect(result).toStrictEqual('');
    });
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
