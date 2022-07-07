import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { JwtRefreshGuard } from 'src/auth/passport/guard/jwtRefreshGuard';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponse } from 'src/user/dto/login.response';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/passport/guard/localAuthGuard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // 로그인
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() userData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email } = userData;
    const accessToken = await this.authService.getJwtAccessToken(email);
    console.log(accessToken);
    const accessOption = {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    };

    const refreshToken = await this.authService.getJwtRefreshToken(email);

    const refreshOption = {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    };

    await this.userService.setCurrentRefreshToken(refreshToken, email);
    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    return;
  }

  // 회원 가입
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDTO,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  // 로그아웃;
  @ApiCreatedResponse({ description: '성공' })
  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();
    await this.userService.removeRefreshToken(req.user.id);
    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);

    return;
  }

  // 리프레시 토큰으로 액세스 토큰 재요청
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const accessToken = await this.authService.getJwtAccessToken(user.email);
    const accessOption = {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    };

    res.cookie('Authentication', accessToken, accessOption);
    return user;
  }
}
