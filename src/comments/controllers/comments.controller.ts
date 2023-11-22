import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';

import { IdParamDto } from '@Constants/dto';
import { AuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { ILoggedUser } from '@Common/types';

import { CreateCommentDto } from '../dtos';
import { CommentsService } from '../services';

@ApiBearerAuth()
@ApiTags('Comments')
@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }
  @ApiOperation({
    description: 'Create a new comment for a post',
    summary: 'Use it to create a new comment for a post',
  })
  @Post('add-comment/:id')
  async createCommentOnPost(
    @Param() idParamDto: IdParamDto,
    @User() loggedUser: ILoggedUser,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.create(
      idParamDto,
      loggedUser,
      createCommentDto,
    );
  }

  @ApiOperation({
    description: 'Delete a comment by id',
    summary: 'Use it to delete a comment by id',
  })
  @Delete(':id')
  async delete(
    @User() loggedUser: ILoggedUser,
    @Param() idParamDto: IdParamDto,
  ) {
    return await this.commentsService.delete(idParamDto, loggedUser);
  }
}
