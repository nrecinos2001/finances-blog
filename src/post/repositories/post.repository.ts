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
}

export const postRepository = new PostRepository();
