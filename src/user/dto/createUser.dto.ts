import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: '비밀번호는 6글자 이상이어야 합니다.',
  })
  @MaxLength(20, {
    message: '비밀번호는 최대 20글자입니다.',
  })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영문과 숫자만 가능합니다.',
  })
  readonly password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: '비밀번호는 6글자 이상이어야 합니다.',
  })
  @MaxLength(20, {
    message: '비밀번호는 최대 20글자입니다.',
  })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영문과 숫자만 가능합니다.',
  })
  readonly comfirmPassword: string;
}
