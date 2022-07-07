/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorType } from 'src/common/error.enum';
import { DefaultError } from 'src/common/error.response';
import { GetUser } from 'src/common/getUserDecorator';
import { HttpErrorType } from 'src/common/httpError.type';
import { MoneyBook } from 'src/moneyBook/entities/moneyBook.entity';
import { User } from 'src/user/entities/user.entity';
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
      - 
  */

  constructor(
    @InjectRepository(MoneyBook)
    private moneybookRepository: Repository<MoneyBook>,
  ) {}

  // 가계부 find
  public async existMoneyBook(bookId: number, @GetUser() user: User) {
    const result = await this.moneybookRepository.findOne({
      where: {
        id: bookId,
        user: user.id,
        deletedAt: null,
      },
    });
    if (result) {
      console.log(111111, result);
      return result;
    } else {
      throw DefaultError.error(
        ErrorType.accountNotFound.code,
        ErrorType.accountNotFound.msg,
      );
    }
  }

  // 가계부 total
  public async totalMoney(type: number, dto: any) {
    let sum = 0;
    if (type == 0) {
      sum += dto.money;
      console.log('+', sum);
      return sum;
    } else {
      sum -= dto.money;
      console.log('-', sum);
      return sum;
    }
  }

  // 가계부 create
  public async createMoneyBook(
    createDto: CreateMoneyBookDto,
    @GetUser() user: User,
  ): Promise<MoneyBook> {
    const moneyBook = new MoneyBook();

    moneyBook.description = createDto.description;
    moneyBook.money = createDto.money;
    moneyBook.type = createDto.type == 0 ? MoneyType[0] : MoneyType[1];
    moneyBook.user = user.id;

    // 기존 유저가 생성한 가계부가 있으면 해당 total을 불러옴.
    // const oldResult = await this.existMoneyBook(bookId,user)// 가장 최근 꺼 하나 불러오는 로직 필요
    // 합쳐야 함. const newTotal = sum + oldResult.total

    const sumResult = this.totalMoney(createDto.type, createDto.money);
    moneyBook.total = Number(sumResult);

    const createdMoneyBook = await this.moneybookRepository.save(moneyBook);
    return createdMoneyBook;
  }
  public async getMoneyBook(bookId: number, @GetUser() user: User) {
    try {
      const result = await this.existMoneyBook(bookId, user);
      return result;
    } catch (error) {
      if (error) {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException(); // handling 해야 함. 가려야 함.
      }
    }
  }
  public async getAllMoneyBooks(@GetUser() user: User): Promise<MoneyBook[]> {
    const allMoneyBooks = await this.moneybookRepository.find({
      where: {
        user: user.id,
      },
    });
    return allMoneyBooks;
  }

  // update 하지 않을 경우 해당 key 값을 빼고 보냄.
  public async modifyMoneyBook(
    bookId: number,
    modifyDto: ModifyMoneyBookDto,
    user: User,
  ) {
    try {
      if (modifyDto.hasOwnProperty('type')) {
        const type = modifyDto.type == 0 ? MoneyType[0] : MoneyType[1];

        const sumResult = Number(this.totalMoney(modifyDto.type, modifyDto.money));

        const oldResult = await this.existMoneyBook(bookId, user);
        const newTotal = sumResult + oldResult.total;

        await this.moneybookRepository
          .createQueryBuilder()
          .update(MoneyBook)
          .set({
            money: modifyDto.money,
            description: modifyDto.description,
            type: type,
            total: newTotal,
          })
          .where('id = :id', { id: bookId })
          .execute();

        const newResult = await this.existMoneyBook(bookId, user);
        return newResult;
      }
    } catch (error) {
      if (error) {
        throw DefaultError.error(HttpErrorType.BAD_REQUEST);
      }
    }
  }
  public async deleteMoneyBook(bookId: number, user: User) {
    const result = await this.existMoneyBook(bookId, user);
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
