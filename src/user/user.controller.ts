import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO, UserParamByIdDTO } from './user.dto';
import { UserService } from './user.service';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() userDTO: CreateUserDTO) {
    return this.service.create(userDTO);
  }

  @Get()
  async find(@MongoQuery() query: MongoQueryModel) {
    return this.service.find(query);
  }

  @Get(':user_id')
  async findById(
    @Param() param: UserParamByIdDTO,
    @MongoQuery() query: MongoQueryModel,
  ) {
    return this.service.findById(param.user_id, query);
  }

  @Put(':user_id')
  async updateById(
    @Param() param: UserParamByIdDTO,
    @Body() dto: UpdateUserDTO,
    @MongoQuery() query: MongoQueryModel,
  ) {
    return this.service.updateById(param.user_id, dto, query);
  }

  @Delete(':user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param() param: UserParamByIdDTO): Promise<void> {
    await this.service.deleteById(param.user_id);
  }
}
