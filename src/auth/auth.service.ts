import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // 유저가 존재하는지 확인합니다.
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
}
