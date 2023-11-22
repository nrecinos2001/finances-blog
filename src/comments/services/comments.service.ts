import { ForbiddenException, Injectable } from '@nestjs/common';

import { ILoggedUser } from '@Common/types';
import { IdParamDto } from '@Constants/dto';
import { PostService } from '@Post/services';

import { CreateCommentDto } from '../dtos';
import { commentsRepository } from '@Comments/repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly postService: PostService) { }
  async create(
    idParamDto: IdParamDto,
    loggedUser: ILoggedUser,
    createCommentDto: CreateCommentDto,
  ) {
    const { id: postId } = idParamDto;
    const { id: userId } = loggedUser;
    // Validate existing post
    await this.postService.findOne(postId);
    // save comment
    await commentsRepository.create(postId, userId, createCommentDto);
    const post = await this.postService.findOne(postId);
    return post;
  }

  async delete(idParamDto: IdParamDto, loggedUser: ILoggedUser) {
    const { id: commentId } = idParamDto;
    const { id: userId } = loggedUser;
    const comment = await commentsRepository.findOne(commentId);
    if (comment.userId !== userId && comment.post.createdBy.id !== userId) {
      throw new ForbiddenException();
    }
    await commentsRepository.deleteById(commentId);
    return await this.postService.findOne(comment.postId);
  }
}
