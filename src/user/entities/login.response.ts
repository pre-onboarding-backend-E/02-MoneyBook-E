import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './base.response';
import { User } from './user.entity';

export abstract class LoginResponseData {
  @ApiProperty()
  user: User;
}

export abstract class LoginResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: LoginResponseData;
}
