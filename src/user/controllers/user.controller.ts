import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IdParamDto } from '@Constants/dto';
import { AuthGuard } from '@Auth/guards';

import { UserService } from '../services';
import { UpdateUserDto } from '../dto';
import { User } from '@Common/decorators';
import { ILoggedUser } from '@Common/types';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* @ApiOperation({
    description: 'Create new user',
    summary: 'Use it to create a new user',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('LLEGO AQUI');
    return await this.userService.create(createUserDto);
  } */

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
  @Get('me')
  async findMyInfo(@User() loggedUser: ILoggedUser) {
    return await this.userService.findOne(loggedUser.id);
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
  async update(
    @User() loggedUser: ILoggedUser,
    @Param() idParamDto: IdParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(
      idParamDto.id,
      updateUserDto,
      loggedUser,
    );
  }

  @Delete(':id')
  remove(
    @Param() idParamDto: IdParamDto,
    @User() loggedUser: ILoggedUser,
  ): Promise<string> {
    return this.userService.remove(idParamDto.id, loggedUser);
  }
}
