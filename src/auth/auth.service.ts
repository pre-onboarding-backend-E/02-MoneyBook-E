import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  // 유저가 존재하는지, 비밀번호가 맞는지 확인 -> validateUser()
  // JWT 생성을 다룬다.
  constructor(private userService: UserService) {}

  async validateUser(payload: LoginDto): Promise<any> {
    const user = await this.userService.findUser(payload);
    if (user) {
      return user;
    }
    return null;
  }
}
