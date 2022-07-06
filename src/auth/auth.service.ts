import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  // JWT 생성을 다룬다.
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 유저가 존재하는지, 비밀번호가 맞는지 확인 -> validateUser()
  async validateUser(payload: LoginDto): Promise<any> {
    const user = await this.userService.findUser(payload);
    if (user) {
      return user;
    }
    return null;
  }

  // 유저 정보를 받아 jwt 토큰 반환
  login(user: User) {
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
