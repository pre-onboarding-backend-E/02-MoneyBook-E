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
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMoneyBookDto } from './dto/createMoneyBook.dto';
import { ModifyMoneyBookDto } from './dto/modifyMoneyBook.dto';
import { DefaultResponse } from './dto/moneyBook.response';
import { MoneyBookService } from './moneyBook.service';

@ApiTags('MoneyBooks')
@Controller('moneybooks')
export class MoneyBookController {
  // try catch & promise 추가
  constructor(private moneybookService: MoneyBookService) {}

  @Post('')
  @ApiCreatedResponse({
    description: 'created money book!',
    type: DefaultResponse,
  })
  async createOne(@Body() createDto: CreateMoneyBookDto) {
    const result = this.moneybookService.createMoneyBook(createDto);
    return result;
  }

  @Patch('/:id')
  @ApiResponse({
    description: 'modify money book!',
    type: DefaultResponse,
  })
  async modifyOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() modifyDto: ModifyMoneyBookDto,
  ) {
    const result = this.moneybookService.modifyMoneyBook(id, modifyDto);
    return result;
  }

  @Get('')
  @ApiResponse({
    description: 'read all money books!',
    type: DefaultResponse,
  })
  async getAll() {
    const result = await this.moneybookService.getAllMoneyBooks();
    return result;
  }

  @Get('/:id')
  @ApiResponse({
    description: 'read money book!',
    type: DefaultResponse,
  })
  async getOne(@Query('id', ParseIntPipe) id: number) {
    const result = this.moneybookService.getMoneyBook(id);
    return result;
  }

  @Delete('/:id')
  @ApiResponse({
    description: 'delete money book!',
    type: DefaultResponse,
  })
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.moneybookService.deleteMoneyBook(id);
  }
}
