import { Test } from '@nestjs/testing';
import { classToPlain } from 'class-transformer';
import { async } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateMoneyBookDto } from '../dto/createMoneyBook.dto';
import { MoneyBook } from '../entities/moneyBook.entity';
import { MoneyBookService } from '../moneyBook.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  softDelete: jest.fn(),
});

describe('MoneyBookService', () => {
  let moneyBookService: MoneyBookService;
  let moneyBookRepository: MockRepository<MoneyBook>;
  let dataSource: DataSource;

  const qr = {
    manager: {},
  } as QueryRunner;

  class MockDataSource {
    createQueryRunner(): QueryRunner {
      return qr;
    }
  }
  qr.connect = jest.fn();
  qr.startTransaction = jest.fn();
  qr.commitTransaction = jest.fn();
  qr.rollbackTransaction = jest.fn();
  qr.release = jest.fn();

  beforeEach(async () => {
    Object.assign(qr.manager, {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      softDelete: jest.fn(),
    });

    const module = await Test.createTestingModule({
      providers: [
        MoneyBookService,
        { provide: 'MoneyBookRepository', useFactory: mockRepository },
        { provide: DataSource, useClass: MockDataSource },
      ],
    }).compile();

    moneyBookService = module.get<MoneyBookService>(MoneyBookService);
    moneyBookRepository = module.get(
      'MoneyBookRepository',
    ) as MockRepository<MoneyBook>;
    dataSource = module.get<DataSource>(DataSource);
  });

  it('기본 테스트', () => {
    expect(moneyBookService).toBeDefined();
  });

  describe('getMoneyBook', () => {
    it('가계부 내역 불러오기', async () => {
      const bookId = 1;
      const user: User = {
        id: 1,
        email: 'team01@naver.com',
        password: '1234abcd',
        createdAt: new Date(),
        updatedAt: new Date(),
        moneyBooks: [],
        toJSON() {
          return classToPlain(this);
        },
      };

      moneyBookRepository.findOne.mockResolvedValueOnce({
        id: 1,
        money: 3000,
        type: '1',
        total: 15000,
        description: '콜라 구매',
      });

      const result = await moneyBookService.getMoneyBook(bookId, user);

      expect(result).toEqual({
        id: 1,
        money: 3000,
        type: '1',
        total: 15000,
        description: '콜라 구매',
      });
    });
  });

  describe('latestMoneyBook', () => {
    it('가계부 내역 중 가장 최신의 정보 불러오기', async () => {
      const user: User = {
        id: 1,
        email: 'team01@naver.com',
        password: '1234abcd',
        createdAt: new Date('2022-07-06T14:49:09.929Z'),
        updatedAt: new Date('2022-07-06T14:49:09.929Z'),
        moneyBooks: [],
        toJSON() {
          return classToPlain(this);
        },
      };

      moneyBookRepository.findOne.mockResolvedValueOnce([
        {
          id: 1,
          money: 3000,
          type: '1',
          total: 15000,
          description: '콜라 구매',
        },
      ]);

      const result = await moneyBookService.latestMoneyBook(user);

      expect(result).toEqual([
        {
          id: 1,
          money: 3000,
          type: '1',
          total: 15000,
          description: '콜라 구매',
        },
      ]);
    });
  });

  describe('createMoneyBook', () => {
    it('가계부 생성', async () => {
      const createDto: CreateMoneyBookDto = {
        money: 3000,
        type: 1,
        description: '콜라 구매',
      };
      const user: User = {
        id: 1,
        email: 'team01@naver.com',
        password: '1234abcd',
        createdAt: new Date('2022-07-06T14:49:09.929Z'),
        updatedAt: new Date('2022-07-06T14:49:09.929Z'),
        moneyBooks: [],
        toJSON() {
          return classToPlain(this);
        },
      };
      const queryRunner = dataSource.createQueryRunner();

      jest.spyOn(queryRunner.manager, 'save').mockResolvedValueOnce({
        id: 1,
        money: 3000,
        type: 1,
        description: '콜라 구매',
        total: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        user: { id: 1 },
      });

      const qrSpyOnFindOne = jest.spyOn(queryRunner.manager, 'findOne');
      const qrSpyOnSave = jest.spyOn(queryRunner.manager, 'save');
      const qrSpyOnCommit = jest.spyOn(queryRunner, 'commitTransaction');
      const qrSpyOnRollback = jest.spyOn(queryRunner, 'rollbackTransaction');
      const qrSpyOnRelease = jest.spyOn(queryRunner, 'release');

      moneyBookRepository.create.mockResolvedValue({
        id: 1,
        money: 3000,
        type: 1,
        description: '콜라 구매',
        total: 10000,
        createdAt: new Date('2022-07-06T14:49:09.929Z'),
        updatedAt: new Date('2022-07-06T14:49:09.929Z'),
        deletedAt: null,
        user: { id: 1 },
      });

      const result = await moneyBookService.createMoneyBook(createDto, user);

      expect(result).toEqual(createDto);
      expect(qrSpyOnFindOne).toHaveBeenCalledTimes(3);
      expect(qrSpyOnSave).toHaveBeenCalledTimes(1);
      expect(qrSpyOnCommit).toHaveBeenCalledTimes(1);
      expect(qrSpyOnRollback).toHaveBeenCalledTimes(0);
      expect(qrSpyOnRelease).toHaveBeenCalledTimes(1);
    });
  });
});
