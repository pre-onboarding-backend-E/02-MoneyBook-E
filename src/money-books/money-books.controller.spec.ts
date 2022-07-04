import { Test, TestingModule } from '@nestjs/testing';
import { MoneyBooksController } from './money-books.controller';

describe('MoneyBooksController', () => {
  let controller: MoneyBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyBooksController],
    }).compile();

    controller = module.get<MoneyBooksController>(MoneyBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
