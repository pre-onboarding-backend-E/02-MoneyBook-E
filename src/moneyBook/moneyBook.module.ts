import { Module } from '@nestjs/common';
import { MoneyBooksController } from './moneyBook.controller';
import { MoneyBooksService } from './moneyBook.service';

@Module({
  controllers: [MoneyBooksController],
  providers: [MoneyBooksService]
})
export class MoneyBooksModule {}
