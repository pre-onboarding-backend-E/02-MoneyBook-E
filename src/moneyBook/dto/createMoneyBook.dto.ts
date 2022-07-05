import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMoneyBookDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: ' 금액', example: 1000 })
  money: number;

  // type ==1 이면 income 2면 outcome / 입력은 number로 나타낼 땐 string  (enum)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: ' income or outcome', example: 1 })
  type: number;

  // 총 합계
  // total : number;

  @ApiProperty({ description: '메모', example: 'memo_1' })
  description: string;

  // createdAt: Date;

  // updatedAt: Date;

  // deletedAt: Date;
}
