import { PrismaInstance } from '@Constants/prisma';
import { Post } from '@prisma/client';

import { CreatePostDto } from '../dto';

class PostRepository {
  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const newPost = await PrismaInstance.post.create({
      data: {
        ...createPostDto,
        userId,
      },
    });
    return newPost;
  }

  async findAll() {
    const allPosts = await PrismaInstance.post.findMany({
      include: { createdBy: true },
      orderBy: { createdAt: 'desc' },
    });
    return allPosts; // TODO: Add type for this response
  }

  async findOneById(id: string) {
    const post = await PrismaInstance.post.findFirst({
      where: { id },
      include: { createdBy: true },
    });
    return post; // TODO: Add type for this response
  }
}

export const postRepository = new PostRepository();
