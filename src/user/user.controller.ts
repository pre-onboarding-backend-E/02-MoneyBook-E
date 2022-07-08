/* eslint-disable prettier/prettier */
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserResponse } from 'src/user/dto/login.response';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/passport/guard/localAuthGuard';
import { GetUser } from 'src/common/getUserDecorator';
import { MSG } from 'src/common/response.enum';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  /* 
    작성자 : 김용민, 박신영
    부작성자 : 염하늘, 김태영
  */

  // 로그인
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: MSG.loginUser.msg })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() userData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email } = userData;
    const { accessToken, accessOption, ...user } =
      await this.authService.getJwtAccessToken(email);
    const { refreshToken, refreshOption } =
      await this.authService.getJwtRefreshToken(email);

    await this.userService.setCurrentRefreshToken(refreshToken, email);
    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    const result = accessToken;
    return UserResponse.response(result, MSG.loginUser.code, MSG.loginUser.msg)
  }

  // 회원 가입
  @Post('/signup')
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ description: MSG.createUser.msg, type: UserResponse })
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDTO,
  ) {
    const result = await this.userService.createUser(createUserDto);
    return UserResponse.response(result, MSG.createUser.code, MSG.createUser.msg);
  }

  // 로그아웃
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({ description: '성공' })
  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ) {
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();
    await this.userService.removeRefreshToken(req.user.id);
    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);

    const result = UserResponse.response(user,MSG.logoutUser.code, MSG.logoutUser.msg);
    return result;
  }

  // 리프레시 토큰으로 액세스 토큰 재요청
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth('access_token')
  @Get('/refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const accessToken = await this.authService.getJwtAccessToken(user.email);
    const accessOption = {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    };

    delete user.password;
    delete user.hashedRefreshToken;
    res.cookie('Authentication', accessToken, accessOption);
    const result = UserResponse.response(user,MSG.refreshTokenWithUser.code, MSG.refreshTokenWithUser.msg);
    return result;
  }
}
