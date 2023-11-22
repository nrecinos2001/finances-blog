import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { ILoggedUser, IPost } from '@Common/types';
import { IdParamDto } from '@Constants/dto';
import { PostService } from '@Post/services';

import { CreateCommentDto } from '../dtos';
import { commentsRepository } from '@Comments/repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly postService: PostService) {}
  async create(
    idParamDto: IdParamDto,
    loggedUser: ILoggedUser,
    createCommentDto: CreateCommentDto,
  ): Promise<IPost> {
    const { id: postId } = idParamDto;
    const { id: userId } = loggedUser;
    // Validate existing post
    await this.postService.findOne(postId);
    // save comment
    await commentsRepository.create(postId, userId, createCommentDto);
    const post = await this.postService.findOne(postId);
    return post;
  }

  async delete(
    idParamDto: IdParamDto,
    loggedUser: ILoggedUser,
  ): Promise<IPost> {
    const { id: commentId } = idParamDto;
    const { id: userId } = loggedUser;
    const comment = await commentsRepository.findOne(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with id ${commentId} was not found`);
    }
    if (comment.userId !== userId && comment.post.createdBy.id !== userId) {
      throw new ForbiddenException();
    }
    await commentsRepository.deleteById(commentId);
    return await this.postService.findOne(comment.postId);
  }
}
