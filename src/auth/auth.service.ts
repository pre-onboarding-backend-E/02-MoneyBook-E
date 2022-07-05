import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  // 유저가 존재하는지, 비밀번호가 맞는지 확인 -> validateUser()
  // JWT 생성을 다룬다.
  constructor(private userService: UserService) {}

  async createTestUser(userData: LoginDto): Promise<object> {
    const result = this.userService.createTestUser(userData);
    return result;
  }
}
