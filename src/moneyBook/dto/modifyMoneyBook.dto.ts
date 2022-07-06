import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMoneyBookDto } from './createMoneyBook.dto';

export class ModifyMoneyBookDto extends CreateMoneyBookDto {
  @IsNotEmpty()
  @ApiProperty({ description: ' 금액', example: 1000 })
  money: number;

  // type ==1 이면 income 2면 outcome / 입력은 number로 나타낼 땐 string  (enum)

  @IsNumber()
  @ApiProperty({ description: ' income or outcome', example: 1 })
  type: number;

  // 총 합계
  // total : number;

  @ApiProperty({ description: '메모', example: '변경memo1' })
  description: string;
}
