import { PrismaInstance } from '@Constants/prisma';
import { Post } from '@prisma/client';

import { CreatePostDto, UpdatePostDto } from '../dto';

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

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedPost = await PrismaInstance.post.update({
      where: { id },
      data: updatePostDto,
      include: { createdBy: true },
    });
    return updatedPost;
  }

  async deleteById(id: string): Promise<string> {
    await PrismaInstance.post.delete({ where: { id } });
    return `${id} deleted`;
  }
}

export const postRepository = new PostRepository();