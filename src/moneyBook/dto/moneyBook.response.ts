import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/baseResponse.dto';
import { MoneyBook } from '../entities/moneyBook.entity';

export abstract class DefaultResponseData {
  @ApiProperty()
  moneybook: MoneyBook;
}

export class DefaultResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: DefaultResponseData;

  public static response(data: any, statusCode?: number, message?: string) {
    const response = new DefaultResponse();
    response.data = data;
    response.message = message; // enum 지정
    response.statusCode = statusCode || 200;

    return response;
  }
}
