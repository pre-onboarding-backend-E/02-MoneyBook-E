import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/baseResponse.dto';

// export abstract class DefaultResponseData {
//   @ApiProperty()
//   data: any;
// }

export class DefaultError extends BaseResponse {
  constructor() {
    super();
  }

  // @ApiProperty()
  // data: DefaultResponseData;

  public static error(data: any, statusCode?: number, message?: string) {
    const response = new DefaultError();
    //response.data = data;
    response.message = message;
    response.statusCode = statusCode || 400;

    return response;
  }
}
