import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 로그인
  // @ApiBody({type: })
  // @ApiCreatedResponse({description: '성공', type: })
  @Post('auth/login')
  async login() {
    return;
  }

  // 회원 가입
  // @ApiBody({type: })
  // @ApiCreatedResponse({description: '성공', type: })
  @Post('auth/signup')
  async signUp() {
    return;
  }

  // 로그아웃
  // @ApiBody({type: })
  // @ApiCreatedResponse({description: '성공', type: })
  @Post('auth/logout')
  async logout() {
    return;
  }
}
