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

  async findOne(id: string) {
    return await PrismaInstance.comment.findFirst({
      where: { id },
      include: { post: { include: { createdBy: { select: { id: true } } } } },
    });
  }

  async deleteById(id: string) {
    return await PrismaInstance.comment.delete({ where: { id } });
  }
}

export const commentsRepository = new CommentsRepository();
