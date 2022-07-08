/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
  ValidationPipe,
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
import { defaultTokenOption } from 'src/common/tokenOption.interface';

/* 
  작성자 : 박신영, 김용민
  부작성자 : 염하늘, 김태영
*/
@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /* 
    - access token, resfresh token 발급하여 로그인 처리
  */
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: MSG.loginUser.msg })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body(ValidationPipe) userData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, accessOption, refreshToken, refreshOption } =
      await this.authService.getTokens(userData.email);

    await this.userService.setCurrentRefreshToken(refreshToken, userData.email);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

    return UserResponse.response(
      accessToken,
      MSG.loginUser.code,
      MSG.loginUser.msg,
    );
  }

  /* 
    - 사용자를 생성하여 회원가입 처리
  */
  @Post('/signup')
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ description: MSG.createUser.msg, type: UserResponse })
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDto);
    return UserResponse.response(
      user.toJSON(),
      MSG.createUser.code,
      MSG.createUser.msg,
    );
  }

  /* 
    - 토큰을 제거하여 로그아웃 기능 구현
  */
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({ description: '성공' })
  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ) {
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();
    console.log(user);
    await this.userService.removeRefreshToken(user.id);

    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);

    return UserResponse.response(
      user.toJSON(),
      MSG.logoutUser.code,
      MSG.logoutUser.msg,
    );
  }

  /* 
    - 리프레시 토큰으로 액세스 토큰 재요청
  */
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth('access_token')
  @Get('/refreshToken')
  async refresh(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.getJwtAccessToken(user.email);
    const accessOption = defaultTokenOption;

    res.cookie('Authentication', accessToken, accessOption);

    return UserResponse.response(
      user.toJSON(),
      MSG.refreshTokenWithUser.code,
      MSG.refreshTokenWithUser.msg,
    );
  }
}
