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
  }
  public async getMoneyBook(id: number) {
    const result = await this.moneybookRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });
    return result;
  }
  public async getAllMoneyBooks(): Promise<MoneyBook[]> {
    const allMoneyBooks = await this.moneybookRepository.find();
    return allMoneyBooks;
  }

  public async modifyMoneyBook(id: number, modifyDto: ModifyMoneyBookDto) {}

  public async deleteMoneyBook(id: number) {}
}
