import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcryptjs';
import { compare } from 'bcryptjs';

class MockUserRepository {
  hashedPassword = bcrypt.hash('abcd1234', bcrypt.genSalt());
  db = [
    {
      id: 1,
      email: 'team02@naver.com',
      password: this.hashedPassword,
      createdAt: new Date('2022-07-06T14:49:09.929Z'),
      updatedAt: new Date('2022-07-06T14:49:09.929Z'),
      hashedRefreshToken: null,
    },
  ];
}

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  // describe('유저 확인', () => {
  //   it('유저 확인', () => {
  //     // const result = await authService.validateUser({
  //     //   email: 'team02@naver.com',
  //     //   password: 'abcd1234',
  //     // });
  //     // expect(result).E;
  //   });
  //   it('잘못된 비밀번호', () => {
  //     return;
  //   });
  // });

  // describe('비밀번호 확인 ', () => {
  //   it('유저 확인', () => {
  //     return;
  //   });
  // });

  // describe('Access token 발급', () => {
  //   it('유저 확인', () => {
  //     return;
  //   });
  // });

  // describe('Refresh token 발급', () => {
  //   it('유저 확인', () => {
  //     return;
  //   });
  // });

  // describe('로그아웃 시 초기화된 쿠키 옵션', () => {
  //   it('유저 확인', () => {
  //     return;
  //   });
  // });
});
