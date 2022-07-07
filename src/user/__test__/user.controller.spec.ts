import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dto/createUser.dto';
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

describe('UsersController', () => {
  let userController: UserController;

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

    userController = userModule.get<UserController>(UserController);
  });
  describe('회원 가입', () => {
    it('구동 검증', async () => {
      const userData: CreateUserDTO = {
        email: 'leo3179@naver.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234',
      };

      const result = await userController.signUp(userData);
      expect(result.email).toStrictEqual(userData.email);
    });
  });
});
