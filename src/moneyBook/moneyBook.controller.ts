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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
import { MSG } from 'src/common/response.enum';
import { CreateMoneyBookDto } from './dto/createMoneyBook.dto';
import { ModifyMoneyBookDto } from './dto/modifyMoneyBook.dto';
import { DefaultResponse } from './dto/moneyBook.response';
import { MoneyBookService } from './moneyBook.service';

@ApiTags('MoneyBooks')
@Controller('moneybooks')
@ApiBearerAuth('access_token')
@UseGuards(AuthGuard('jwt'))
export class MoneyBookController {

  constructor(private moneybookService: MoneyBookService) {}

  @Post('')
  @ApiCreatedResponse({
    description: MSG.createOne.msg,
    type: DefaultResponse,
  })

  async createOne(@Body() createDto: CreateMoneyBookDto,@GetUser() user : User) {
    const result = await this.moneybookService.createMoneyBook(createDto,user);
    return DefaultResponse.response(result, MSG.createOne.code, MSG.createOne.msg);
  }

  @Patch('/:id')
  @ApiResponse({
    description: MSG.modifyOne.msg, 
    type: DefaultResponse,
  })
  async modifyOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() modifyDto: ModifyMoneyBookDto, @GetUser() user : User
  ) {
    const result = await this.moneybookService.modifyMoneyBook(id, modifyDto,user);
    return DefaultResponse.response(result, MSG.modifyOne.code, MSG.modifyOne.msg);
  }

  @Get('')
  @ApiResponse({
    description: MSG.getAll.msg,
  })
  async getAll(@GetUser() user : User ) {
    const result = await this.moneybookService.getAllMoneyBooks(user);
    return  DefaultResponse.response(result, MSG.getAll.code, MSG.getAll.msg);
  }

  @Get('/:id')
  @ApiResponse({
    description: MSG.getOne.msg,
  })
  async getOne(@Query('id', ParseIntPipe) id: number, @GetUser() user : User) {
    const result = await this.moneybookService.getMoneyBook(id, user);
    return DefaultResponse.response(result, MSG.getOne.code, MSG.getOne.msg);
  }

  @Delete('/:id')
  @ApiResponse({
    description: MSG.deleteOne.msg,
  })
  async deleteOne(@Param('id', ParseIntPipe) id: number, @GetUser() user : User) {
   const result = await this.moneybookService.deleteMoneyBook(id, user);
   return DefaultResponse.response(result, MSG.deleteOne.code, MSG.deleteOne.msg);
  }
}
