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
import { MoneyBookService } from './moneyBook.service';

@ApiTags('MoneyBooks')
@Controller('moneybooks')
export class MoneyBookController {
  // api Response example / success / fail (feedback)
  constructor(private moneybookService: MoneyBookService) {}

  @Patch('/:id')
  async modifyOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() modifyDto: ModifyMoneyBookDto,
  ) {
    const result = this.moneybookService.modifyMoneyBook(id, modifyDto);
    //return DefaultResponse.ok(result);
  }
  @Get('')
  @ApiResponse({
    description: '목록 조회 성공',
  })
  async getAll() {
    const result = this.moneybookService.getAllMoneyBooks();
  }

  @Get('/:id')
  async getOne(@Query('id', ParseIntPipe) id: number) {
    const result = this.moneybookService.getMoneyBook(id);
    //return DefaultResponse.ok(result);
  }

  @Post('')
  @ApiCreatedResponse({
    description: '가계부 생성 성공',
  })
  async createOne(@Body() createDto: CreateMoneyBookDto) {
    const result = this.moneybookService.createMoneyBook(createDto);
  }

  // void
  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const result = this.moneybookService.deleteMoneyBook(id);
  }
}
