import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
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
        '잘못된 비밀번호이거나 존재하지 않는 유저입니다.',
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

  async getJwtAccessToken(email: string): Promise<string> {
    // AccessToken 발급
    // accessToken에 비밀번호를 제외한 유저 정보를 넣어줍니다.
    const payload = await this.userService.getUserByEmail(email);
    delete payload.password;

    const accessToken = await this.jwtService.sign(
      { ...payload },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    );

    return accessToken;
  }

  async getJwtRefreshToken(email: string): Promise<string> {
    // RefreshToken 발급
    const payload = { email };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return refreshToken;
  }

  getCookiesForLogOut() {
    // 로그아웃 시 초기화한 쿠키 옵션을 전달한다.
    return {
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
