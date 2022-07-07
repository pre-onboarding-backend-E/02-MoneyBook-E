import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorType } from 'src/common/error.enum';
import { DefaultError } from 'src/common/error.response';
import { HttpErrorType } from 'src/common/httpError.type';
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

    let sum = 0;
    if (moneyBook.type == 'income') {
      sum += createDto.money;
    } else {
      sum -= createDto.money;
    }
    moneyBook.total = sum;

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
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
      // throw DefaultError.error(ErrorType.accountBookNotFound);
    }
  }
  public async getAllMoneyBooks(): Promise<MoneyBook[]> {
    const allMoneyBooks = await this.moneybookRepository.find();
    return allMoneyBooks;
  }

  // update x -> key 를 빼고 보냄.
  public async modifyMoneyBook(bookId: number, modifyDto: ModifyMoneyBookDto) {
    try {
      if (modifyDto.hasOwnProperty('type')) {
        const type = modifyDto.type == 0 ? MoneyType[0] : MoneyType[1];

        await this.moneybookRepository
          .createQueryBuilder()
          .update(MoneyBook)
          .set({
            money: modifyDto.money,
            description: modifyDto.description,
            type: type,
          })
          .where('id = :id', { id: bookId })
          .execute();

        const result = await this.moneybookRepository.findOne({
          where: {
            id: bookId,
          },
        });
        return result;
      }
    } catch (error) {
      if (error) {
        throw DefaultError.error(HttpErrorType.BAD_REQUEST);
      }
    }
  }
  public async deleteMoneyBook(bookId: number) {
    const result = await this.moneybookRepository.findOne({
      where: {
        id: bookId,
      },
    });
    if (result) {
      await this.moneybookRepository.softDelete({
        id: bookId,
      });
      return bookId;
    } else {
      throw NotFoundException;
    }
  }
}
