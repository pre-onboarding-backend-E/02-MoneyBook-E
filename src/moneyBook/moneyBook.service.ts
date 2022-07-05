import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneyBook } from 'src/moneyBook/entities/moneyBook.entity';
import { Repository } from 'typeorm';
import { CreateMoneyBookDto } from './dto/createMoneyBook.dto';
import { ModifyMoneyBookDto } from './dto/modifyMoneyBook.dto';
import { MoneyType } from './type/moneyBook.enum';

@Injectable()
export class MoneyBookService {
  /* 
    작성자 : 염하늘
      - CRRUD 로직 구현
    부작성자 : 
      - abc 로직 개선
  */

  constructor(
    @InjectRepository(MoneyBook)
    private moneybookRepository: Repository<MoneyBook>,
  ) {}

  public async createMoneyBook(createDto: CreateMoneyBookDto) {
    const moneyBook = new MoneyBook();

    moneyBook.description = createDto.description;
    moneyBook.money = createDto.money;
    moneyBook.type = createDto.type == 0 ? MoneyType[0] : MoneyType[1];
    moneyBook.total = 0; // 추후 수정

    await this.moneybookRepository.save(moneyBook);

    // moneyBook.type = createDto.type (enum)
  }
  getMoneyBook(id: number): Promise<MoneyBook> {
    throw new Error('Method not implemented.');
  }
  getAllMoneyBooks(): Promise<MoneyBook[]> {
    throw new Error('Method not implemented.');
  }

  modifyMoneyBook(
    id: number,
    modifyDto: ModifyMoneyBookDto,
  ): Promise<MoneyBook> {
    throw new Error('Method not implemented.');
  }

  deleteMoneyBook(id: number) {
    throw new Error('Method not implemented.');
  }
}
