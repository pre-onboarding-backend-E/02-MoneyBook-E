import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

class MockUserRepository {
  db = [
    {
      id: 1,
      email: 'team02@naver.com',
      password: 'abcd1234',
      createdAt: new Date('2022-07-06T14:49:09.929Z'),
      updatedAt: new Date('2022-07-06T14:49:09.929Z'),
    },
  ];
  findOne({ where: { email } }) {
    const users = this.db.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }
  create(userData) {
    return userData;
  }
  save(userData) {
    this.db.push(userData);
    return userData;
  }
}

describe('UsersService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
  });

  describe('회원 가입', () => {
    it('회원 가입 검증', async () => {
      const userData = {
        email: 'team02@naver.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234',
      };

      const result = await userService.createUser(userData);
      expect(result.email).toStrictEqual(userData.email);
    });
    it('비밀번호 불일치시', async () => {
      const userData = {
        email: 'leo3179@naver.com',
        password: 'abcd1234',
        confirmPassword: '1234abcd',
      };
      try {
        await userService.createUser(userData);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('회원 조회', () => {
    it('email로 유저정보 조회 검증', async () => {
      const email = 'team02@naver.com';

      const dbData = {
        id: 1,
        email: 'team02@naver.com',
        password: 'abcd1234',
        createdAt: new Date('2022-07-06T14:49:09.929Z'),
        updatedAt: new Date('2022-07-06T14:49:09.929Z'),
      };
      const result = await userService.getUserByEmail(email);
      expect(result).toStrictEqual(dbData);
    });
  });
});
