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

@UseGuards(AuthGuard)
@ApiTags('Posts')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

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

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
