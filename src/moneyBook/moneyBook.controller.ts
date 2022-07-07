/* eslint-disable prettier/prettier */
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
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MSG } from 'src/common/response.enum';
import { CreateMoneyBookDto } from './dto/createMoneyBook.dto';
import { ModifyMoneyBookDto } from './dto/modifyMoneyBook.dto';
import { DefaultResponse } from './dto/moneyBook.response';
import { MoneyBookService } from './moneyBook.service';

@ApiTags('MoneyBooks')
@Controller('moneybooks')
export class MoneyBookController {

  constructor(private moneybookService: MoneyBookService) {}

  @Post('')
  @ApiCreatedResponse({
    description: MSG.createOne.msg,
    type: DefaultResponse,
  })
  async createOne(@Body() createDto: CreateMoneyBookDto) {
    const result = await this.moneybookService.createMoneyBook(createDto);
    return DefaultResponse.response(result, MSG.createOne.code, MSG.createOne.msg);
  }

  // Response 나오게 처리 할 것.
  @Patch('/:id')
  @ApiResponse({
    description: MSG.modifyOne.msg,
    type: DefaultResponse,
  })
  async modifyOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() modifyDto: ModifyMoneyBookDto,
  ) {
    const result = await this.moneybookService.modifyMoneyBook(id, modifyDto);
    console.log(2333,result)
    return DefaultResponse.response(result, MSG.modifyOne.code, MSG.modifyOne.msg);
  }

  @Get('')
  @ApiResponse({
    description: MSG.getAll.msg,
  })
  async getAll() {
    const result = await this.moneybookService.getAllMoneyBooks();
    return  DefaultResponse.response(result, MSG.getAll.code, MSG.getAll.msg);
  }

  @Get('/:id')
  @ApiResponse({
    description: MSG.getOne.msg,
  })
  async getOne(@Query('id', ParseIntPipe) id: number) {
    const result = await this.moneybookService.getMoneyBook(id);
    return DefaultResponse.response(result, MSG.getOne.code, MSG.getOne.msg);
  }

  @Delete('/:id')
  @ApiResponse({
    description: MSG.deleteOne.msg,
  })
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
   const result = await this.moneybookService.deleteMoneyBook(id);
   return DefaultResponse.response(result, MSG.deleteOne.code, MSG.deleteOne.msg);
  }
}
