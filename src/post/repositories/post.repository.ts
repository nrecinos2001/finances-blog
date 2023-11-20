import { PrismaInstance } from '@Constants/prisma';
import { Post } from '@prisma/client';

import { CreatePostDto, UpdatePostDto } from '../dto';
import { IPost } from '@Common/types';

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

  async findAll(): Promise<IPost[]> {
    const allPosts = await PrismaInstance.post.findMany({
      include: { createdBy: true, receivedLkes: true },
      orderBy: { createdAt: 'desc' },
    });
    return allPosts; // TODO: Add type for this response
  }

  async findOneById(id: string): Promise<IPost> {
    const post = await PrismaInstance.post.findFirst({
      where: { id },
      include: { createdBy: true, receivedLkes: true },
    });
    return post; // TODO: Add type for this response
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<IPost> {
    const updatedPost = await PrismaInstance.post.update({
      where: { id },
      data: updatePostDto,
      include: { createdBy: true, receivedLkes: true },
    });
    return updatedPost;
  }

  async deleteById(id: string): Promise<string> {
    await PrismaInstance.post.delete({ where: { id } });
    return `${id} deleted`;
  }

  async updateLikes(id: string, likes: number): Promise<IPost> {
    const updatedPost = await PrismaInstance.post.update({
      where: { id },
      data: { likes },
      include: { createdBy: true, receivedLkes: true },
    });
    return updatedPost;
  }
}

export const postRepository = new PostRepository();
