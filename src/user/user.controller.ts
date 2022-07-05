import { Body, Controller, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponse } from 'src/user/dto/login.response';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 회원가입_테스트
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('/signup/one')
  async signUpOne(@Body() userData: LoginDto): Promise<object> {
    const result = await this.userService.createTestUser(userData);
    return result;
  }

  // 로그인
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() userData: LoginDto) {
    const result = await this.userService.login(userData);
    return result;
  }

  // 회원 가입
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDTO,
  ): Promise<User> {
    return this.userService.createUSer(createUserDto);
  }

  // 로그아웃
  @Post('/logout')
  async logout() {
    return;
  }
}
