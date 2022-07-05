import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../common/baseResponse.dto';
import { User } from '../entities/user.entity';

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
