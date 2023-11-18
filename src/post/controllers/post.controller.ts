import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { ILoggedUser } from '@Common/types';

import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { IdParamDto } from '@Constants/dto';

@UseGuards(AuthGuard)
@ApiTags('Posts')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    description: 'Create a new post',
    summary: 'Use it to create a new endpoint',
  })
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() loggedUser: ILoggedUser,
  ) {
    return await this.postService.create(createPostDto, loggedUser);
  }

  @ApiOperation({
    description: 'Find all posts',
    summary: 'Use it to find all posts',
  })
  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @ApiOperation({
    description: 'Find a post by id',
    summary: 'Use it to find a post by id',
  })
  @Get(':id')
  async findOne(@Param() idParamDto: IdParamDto) {
    return await this.postService.findOne(idParamDto.id);
  }

  @ApiOperation({
    description: 'Update a post by id',
    summary: 'Use it to update a post by id',
  })
  @Patch(':id')
  update(
    @Param() idParamDto: IdParamDto,
    @Body() updatePostDto: UpdatePostDto,
    @User() loggedUser: ILoggedUser,
  ) {
    return this.postService.update(idParamDto, updatePostDto, loggedUser);
  }

  @ApiOperation({
    description: 'Delete a post by id',
    summary: 'Use it to delete a post by id',
  })
  @Delete(':id')
  async remove(
    @Param() idParamDto: IdParamDto,
    @User() loggedUser: ILoggedUser,
  ): Promise<string> {
    return await this.postService.remove(idParamDto, loggedUser);
  }
}
