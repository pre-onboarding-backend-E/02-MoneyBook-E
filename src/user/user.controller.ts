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
import { JwtRefreshGuard } from 'src/auth/passport/Guard/jwtRefreshGuard';
import { LocalAuthGuard } from 'src/auth/passport/Guard/localAuthGuard';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/common/skipAuthDecorator';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponse } from 'src/user/dto/login.response';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

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
  @Post('/login')
  // async login(@Request() req, @Res({ passthrough: true }) res: Response) {
  //   const user = req.user;

  //   // 액세스 토큰 발급 요청
  //   // ----

  //   // 리프레스 토큰 발급
  //   const { refreshToken, ...refreshOption } =
  //     this.authService.getCookieWithJwtRefreshToken(user.id);
  //   await this.userService.setCurrentRefreshToken(refreshToken, user.id);

  //   // 액세스 토큰 전달
  //   // ----

  //   // 리프레스 토큰 전달
  //   res.cookie('Refresh', refreshToken, refreshOption);
  //   return req.user;
  // }
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(loginDto);

    res.cookie('Authentication', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
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
  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    // const { token, ...option } = await this.authService.logOut();
    // res.cookie('Authentication', token, option);
    // return;
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut(req.user.id);
    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user.id);
    res.cookie('Authentication', accessToken, accessOption);
    return user;
  }
}
