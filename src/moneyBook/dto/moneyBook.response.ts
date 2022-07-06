import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/baseResponse.dto';
import { MoneyBook } from '../entities/moneyBook.entity';

export abstract class DefaultResponseData {
  @ApiProperty()
  moneybook: MoneyBook;
}

export abstract class DefaultResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: DefaultResponseData;
}
