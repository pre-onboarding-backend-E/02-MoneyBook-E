//TODO: passport local strategy를 사용한다.
// 유저가 존재하고 유효한지 결정

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: LoginDto): Promise<any> {
    const validateuser = await this.authService.validateUser(user);
    if (!validateuser) {
      throw new UnauthorizedException();
    }
    return validateuser;
  }
}
