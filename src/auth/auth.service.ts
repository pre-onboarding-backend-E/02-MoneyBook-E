import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  // JWT 생성을 다룬다.
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 유저가 존재하는지, 비밀번호가 맞는지 확인 -> validateUser()
  async validateUser(payload: LoginDto): Promise<any> {
    try {
      const { password, email } = payload;
      const userData = await this.userService.getUserByEmail(email);
      await this.verityPassword(password, userData.password);
      return userData;
    } catch (e) {
      throw new HttpException(
        '잘못된 비밀번호 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 비밀번호가 일치하는지 확인합니다.
  private async verityPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException(
        '잘못된 비밀번호 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 유저 정보를 받아 jwt 토큰 반환
  // async login(user: User) {
  //   const payload = { id: user.id, email: user.email };
  //   const token = this.jwtService.sign(payload);
  //   return token;
  // }

  getCookieWithJwtAccessToken() {
    // AccessToken 발급
  }

  getCookieWithJwtRefreshToken(id: number) {
    // RefreshToken 발급
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
    });

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
    };
  }

  getCookiesForLogOut() {
    // 로그아웃
  }

  async logOut() {
    return {
      token: '',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 0,
    };
  }
}
