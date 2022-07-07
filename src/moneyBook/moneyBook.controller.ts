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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/getUserDecorator';
import { User } from 'src/user/entities/user.entity';
import { CreateMoneyBookDto } from './dto/createMoneyBook.dto';
import { ModifyMoneyBookDto } from './dto/modifyMoneyBook.dto';
import { DefaultResponse } from './dto/moneyBook.response';
import { MoneyBookService } from './moneyBook.service';

@ApiTags('MoneyBooks')
@Controller('moneybooks')
@UseGuards(AuthGuard('jwt'))
export class MoneyBookController {
  // try catch & promise 추가
  constructor(private moneybookService: MoneyBookService) {}

  @Post('')
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'created money book!',
    type: DefaultResponse,
  })
  async createOne(
    @Body() createDto: CreateMoneyBookDto,
    @GetUser() user: User,
  ) {
    const result = this.moneybookService.createMoneyBook(createDto);
    return result;
  }

  @Patch('/:id')
  @ApiBearerAuth('access-token')
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
  @ApiBearerAuth('access-token')
  @ApiResponse({
    description: 'read all money books!',
    type: DefaultResponse,
  })
  async getAll() {
    const result = await this.moneybookService.getAllMoneyBooks();
    return result;
  }

  @Get('/:id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    description: 'read money book!',
    type: DefaultResponse,
  })
  async getOne(@Query('id', ParseIntPipe) id: number) {
    const result = this.moneybookService.getMoneyBook(id);
    return result;
  }

  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    description: 'delete money book!',
    type: DefaultResponse,
  })
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.moneybookService.deleteMoneyBook(id);
  }
}
