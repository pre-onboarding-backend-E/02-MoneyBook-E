import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
