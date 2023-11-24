import { PrismaInstance } from '@Constants/prisma';

class LikesRepository {
  async create(createLikeDto) {
    const newLike = await PrismaInstance.likes.create({
      data: createLikeDto,
      include: { post: true },
    });
    return newLike;
  }

  async delete(id: string) {
    const removeLike = await PrismaInstance.likes.delete({
      where: { id },
    });
    return removeLike;
  }

  async findOneByPostAndUser(userId: string, postId: string) {
    const foundLike = await PrismaInstance.likes.findFirst({
      where: {
        postId,
        userId,
        post: {
          AND: { OR: [{ deleted: false }, { deleted: { isSet: false } }] },
        },
      },
      include: { post: true },
    });
    return foundLike;
  }
}

export const likesRepository = new LikesRepository();
