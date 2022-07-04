import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponse } from 'src/user/entities/login.response';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 로그인
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('auth/login')
  async login() {
    return;
  }

  // 회원 가입
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('auth/signup')
  async signUp() {
    return;
  }

  // 로그아웃
  @Post('auth/logout')
  async logout() {
    return;
  }
}
