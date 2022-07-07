import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../common/baseResponse.dto';
import { User } from '../entities/user.entity';

export abstract class LoginResponseData {
  @ApiProperty()
  user: User;
}

export class LoginResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: LoginResponseData;

  public static response(data: any, statusCode?: number, message?: string) {
    const response = new LoginResponse();
    response.data = data;
    response.message = message;
    response.statusCode = statusCode || 200;

    return response;
  }
}
