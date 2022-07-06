import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  public async createMoneyBook(
    createDto: CreateMoneyBookDto,
  ): Promise<MoneyBook> {
    const moneyBook = new MoneyBook();

    moneyBook.description = createDto.description;
    moneyBook.money = createDto.money;
    moneyBook.type = createDto.type == 0 ? MoneyType[0] : MoneyType[1];
    moneyBook.total = 0; // 추후 수정

    const createdMoneyBook = await this.moneybookRepository.save(moneyBook);
    return createdMoneyBook;
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

  public async modifyMoneyBook(id: number, modifyDto: ModifyMoneyBookDto) {
    // try {
    //   const modifyDTO = new ModifyMoneyBookDto();
    //   if (modifyDTO.hasOwnProperty('type')) {
    //     const type = modifyDTO.type == 0 ? MoneyType[0] : MoneyType[1];
    //   } else {
    //     const modifedResult = await this.moneybookRepository.update(
    //       id,
    //       modifyDto,
    //     );
    //   }
    //   return modifedResult;
    // } catch (error) {
    //   console.log(error);
    //   throw BadRequestException;
    // }
  }

  public async deleteMoneyBook(bookId: number) {
    const result = await this.moneybookRepository.findOne({
      where: {
        id: bookId,
      },
    });
    if (result)
      await this.moneybookRepository.softDelete({
        id: bookId,
      });
    else {
      throw NotFoundException;
    }
  }
}
