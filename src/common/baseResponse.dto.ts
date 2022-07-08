import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse {
  /* 
    작성자 : 박신영
      - base response template 작성
  */

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
