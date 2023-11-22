import { PrismaInstance } from '@Constants/prisma';

import { CreateCommentDto } from '../dtos';

class CommentsRepository {
  async create(
    postId: string,
    userId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const newComment = await PrismaInstance.comment.create({
      data: {
        userId,
        postId,
        ...createCommentDto,
      },
    });
    return newComment;
  }
}

export const commentsRepository = new CommentsRepository();
