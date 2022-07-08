/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneyBook } from 'src/moneyBook/entities/moneyBook.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMoneyBookDto } from './dto/createMoneyBook.dto';
import { ModifyMoneyBookDto } from './dto/modifyMoneyBook.dto';
import { MoneyType } from './type/moneyBook.enum';

@Injectable()
export class MoneyBookService {
  /* 
    작성자 : 염하늘 / 김용민
      - CRRUD 로직 구현 (염하늘)
      - Restore 로직 구현 (김용민)
  */
  constructor(
    @InjectRepository(MoneyBook)
    private moneybookRepository: Repository<MoneyBook>,
  ) {}

  // 가계부 내역이 존재하는지 확인하고 존재하면 해당 정보를 불러옴.
  public async getMoneyBook(bookId: number, user: User) {
    const result = await this.moneybookRepository.findOne({
      where: [ { id: bookId }, user ]
    });
    if (result) {
      return result;
    } else {
      throw new NotFoundException('존재하지 않는 내역입니다.');
    }
  }
  // 로그인한 유저가 작성한 가계부 내역 중 가장 최신의 정보을 불러옴. 
  public async latestMoneyBook(user: User) {
    const latestResult = await this.moneybookRepository.findOne({
      where: [ user ],
      order: {
        updatedAt: 'DESC',
        createdAt: 'DESC',
      },
    });
    if (latestResult) {
      return latestResult;
    }
  }

  // total 바뀐 거 구하기 (모으기)
  public async newTotal (bookId, dto : CreateMoneyBookDto | ModifyMoneyBookDto) {
    //this.latestMoneyBook();
  }


  // 유저가 가계부를 생성함. try catch 추가
  public async createMoneyBook(
    createDto: CreateMoneyBookDto,
   user: User,
  ): Promise<MoneyBook> {
    const moneyBook = new MoneyBook();

    moneyBook.description = createDto.description;
    moneyBook.money = createDto.money;
    moneyBook.type = createDto.type == 0 ? MoneyType[0] : MoneyType[1];
    moneyBook.user = user;
    const currentMoney = createDto.type == 0 ? moneyBook.money : -moneyBook.money;

    const latestTotal = await this.latestMoneyBook(user);
    if (latestTotal) {
      moneyBook.total = latestTotal.total + currentMoney;
    } else {
      moneyBook.total = currentMoney;
    }
    const createdMoneyBook = await this.moneybookRepository.save(moneyBook);
    return createdMoneyBook;
  }

  // 유저가 작성한 가계부 내역 상세 조회
  // public async getMoneyBook(bookId: number, @GetUser() user: User) {
  //   try {
  //     const result = await this.existMoneyBook(bookId, user);
  //     return result;
  //   } catch (error) {
  //     if (error) {
  //       throw new NotFoundException('존재하지 않는 내역입니다.');
  //     } else {
  //       throw new InternalServerErrorException(); // handling 해야 함. 가려야 함.
  //     }
  //   }
  // }
  // 유저가 작성한 가계부 목록 (내역) 최신 순으로 조회
  public async getAllMoneyBooks(user: User): Promise<MoneyBook[]> {
    const allMoneyBooks = await this.moneybookRepository.find({
      where: [ user ], 
      order: {
        createdAt: 'DESC',
      },
    });
    return allMoneyBooks;
  }

  // 유저가 작성한 가계부 상세 내역을 수정함.
  // 수정을 원하지 않을 경우 해당 key 값을 빼고 보냄.
  public async modifyMoneyBook(
    bookId: number,
    modifyDto: ModifyMoneyBookDto,
    user: User,
  ) {
    try {
      if (modifyDto.hasOwnProperty('type')) {

        const type = modifyDto.type == 0 ? MoneyType[0] : MoneyType[1];
        const currentMoney = modifyDto.type == 0 ? modifyDto.money : -modifyDto.money;

        // 해당 유저가 작성한 가계부 내역 존재하는지 확인
        await this.getMoneyBook(bookId, user);

        let newTotal = 0;
        const latestTotal = await this.latestMoneyBook(user);
        if (latestTotal) {
          newTotal = latestTotal.total + currentMoney;
        } else {
          newTotal = currentMoney;
        }

        await this.moneybookRepository
          .createQueryBuilder()
          .update(MoneyBook)
          .set({
            money: modifyDto.money,
            description: modifyDto.description,
            type,
            total: newTotal,
          })
          .where('id = :id', { id: bookId })
          .execute();

        const newResult = await this.getMoneyBook(bookId, user);
        return newResult;
      }
    } catch (error) {
      if (error) {
        throw new BadRequestException('수정할 내역이 올바르게 입력되지 않았습니다.');
      }
    }
  }

  // 유저가 작성한 가계부 상세 내역을 삭제함. (soft delete 처리하여 내역은 존재함.) try catch
  public async deleteMoneyBook(bookId: number, user: User) {
    const result = await this.getMoneyBook(bookId, user);
    if (result) {
      await this.moneybookRepository.softDelete({
        id: bookId,
      });
      return bookId;
    } else {
      throw new NotFoundException('존재하지 않는 내역입니다.');
    }
  }

  // 유저가 삭제한 가계부 내역을 복구함.
  public async restoreMoneyBook(bookId: number): Promise<MoneyBook> { // try catch
    const accountBook = await this.moneybookRepository.findOne({
      where: { id : bookId },
      withDeleted: true,
    });

    if (!accountBook) {
      throw new NotFoundException('존재하지 않는 내역입니다.');
    }

    if (accountBook.deletedAt === null) {
      throw new BadRequestException('삭제되지 않은 내역입니다.');
    }

    accountBook.deletedAt = null;
    await this.moneybookRepository.save(accountBook);

    return accountBook;
  }
}
