import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  // 유저가 존재하는지, 비밀번호가 맞는지 확인 -> validateUser()
  // JWT 생성을 다룬다.
}
