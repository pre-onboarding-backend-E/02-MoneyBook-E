import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';

// Passport 전략의 동작을 사용자화합니다.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // 사용자가 존재하고 유효한지 확인합니다.
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}