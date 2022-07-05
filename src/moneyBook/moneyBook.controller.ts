import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMoneyBookDto } from './dto/createMoneyBook.dto';
import { ModifyMoneyBookDto } from './dto/modifyMoneyBook.dto';
import { MoneyBookResponse } from './dto/moneyBookResponse';
import { MoneyBook } from './entities/moneyBook.entity';
import { MoneyBookService } from './moneyBook.service';

@ApiTags('MoneyBooks')
@Controller('moneybooks')
export class MoneyBookController {
  // api Response example / success / fail (feedback)
  // try catch & promise 추가
  constructor(private moneybookService: MoneyBookService) {}

  @Post('')
  @ApiCreatedResponse({ description: '성공', type: MoneyBookResponse })
  async createOne(@Body() createDto: CreateMoneyBookDto) {
    const result = await this.moneybookService.createMoneyBook(createDto);
    return result;
  }

  @Patch('/:id')
  async modifyOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() modifyDto: ModifyMoneyBookDto,
  ) {
    const result = this.moneybookService.modifyMoneyBook(id, modifyDto);
    //return DefaultResponse.ok(result);
  }
  // updated/ delete 내역 제외. deleted=null인 것만
  @Get('')
  @ApiResponse({ description: '성공', type: MoneyBookResponse })
  async getAll() {
    const result = await this.moneybookService.getAllMoneyBooks();
    return result;
  }

  @Get('/:id')
  async getOne(@Query('id', ParseIntPipe) id: number) {
    const result = this.moneybookService.getMoneyBook(id);
    return result;
  }

  // void
  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const result = this.moneybookService.deleteMoneyBook(id);
  }
}
