import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IdParamDto } from '@Constants/dto';

import { UserService } from '../services';
import { CreateUserDto, UpdateUserDto } from '../dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Create new user',
    summary: 'Use it to create a new user',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('LLEGO AQUI');
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Find all users',
    summary: 'Use it to find all users',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    description: 'Find one user by id',
    summary: 'Use it to find a user by id',
  })
  @Get(':id')
  async findOne(@Param() idParamDto: IdParamDto) {
    return await this.userService.findOne(idParamDto.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
