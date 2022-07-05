import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponse } from 'src/user/entities/login.response';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입_테스트
  @Post('/signup/one')
  async signUpOne(@Body() userData: LoginDto): Promise<object> {
    const result = await this.authService.createTestUser(userData);
    return { message: 'create success!', data: result };
  }

  // 로그인
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('/login')
  async login() {
    return;
  }

  // 회원 가입
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('/signup')
  async signUp() {
    return;
  }

  // 로그아웃
  @Post('/logout')
  async logout() {
    return;
  }
}
