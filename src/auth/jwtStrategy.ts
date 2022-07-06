import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    console.log(process.env.JWT_SECRET_KEY);
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Authentication;
        },
      ]), // jwt 추출 방법 : 쿠키
      ignoreExpiration: false, // 토큰이 만료되면 401 예외
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload) {
    const { email } = payload;
    const user: User = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('유효한 사용자가 아닙니다.');
    }

    return user;
  }
}
