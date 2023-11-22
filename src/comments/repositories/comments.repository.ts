import { PrismaInstance } from '@Constants/prisma';

import { CreateCommentDto } from '../dtos';
import { IComment } from '@Common/types';

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

  async findOne(id: string): Promise<IComment> {
    return await PrismaInstance.comment.findFirst({
      where: { id },
      include: { post: { include: { createdBy: true } } },
    });
  }

  async deleteById(id: string) {
    return await PrismaInstance.comment.delete({ where: { id } });
  }
}

export const commentsRepository = new CommentsRepository();
