import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMoneyBookDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: ' 금액', example: 1000 })
  money: number;

  @IsNotEmpty()
  @IsNumber()
  //@Matches(/[^0-1]/)
  @ApiProperty({
    description: ' 0을 입력하면 수입 (income) / 1을 입력하면 지출 (outcome)',
    example: 0,
  })
  type: number;

  @ApiPropertyOptional({ description: '메모', example: 'memo_1' })
  description: string;
}
