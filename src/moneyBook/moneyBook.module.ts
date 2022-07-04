import { Module } from '@nestjs/common';
import { MoneyBookController } from './moneyBook.controller';
import { MoneyBookService } from './moneyBook.service';

@Module({
  controllers: [MoneyBookController],
  providers: [MoneyBookService],
})
export class MoneyBooksModule {}
