import { Module } from '@nestjs/common';
import { MoneyBooksController } from './money-books.controller';
import { MoneyBooksService } from './money-books.service';

@Module({
  controllers: [MoneyBooksController],
  providers: [MoneyBooksService]
})
export class MoneyBooksModule {}
