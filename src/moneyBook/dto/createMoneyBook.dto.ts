import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateMoneyBookDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: ' 금액', example: 1000 })
  money: number;

  @IsNotEmpty()
  @IsNumber()
  @Matches(/[0-1]/, {
    message: 'type은 0과 1만 입력 가능합니다.',
  })
  @ApiProperty({
    description: ' income or outcome',
    example: 0,
  })
  type: number;

  @ApiProperty({ description: '메모', example: 'memo_1' })
  description: string;
}
