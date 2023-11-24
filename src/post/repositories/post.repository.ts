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
      where: {
        AND: { OR: [{ deleted: false }, { deleted: { isSet: false } }] },
      },
      include: {
        createdBy: true,
        receivedLikes: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return allPosts; // TODO: Add type for this response
  }

  async findOneById(id: string): Promise<IPost> {
    const post = await PrismaInstance.post.findFirst({
      where: {
        id,
        AND: { OR: [{ deleted: false }, { deleted: { isSet: false } }] },
      },
      include: {
        createdBy: true,
        receivedLikes: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: { user: true },
        },
      },
    });
    return post; // TODO: Add type for this response
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<IPost> {
    const updatedPost = await PrismaInstance.post.update({
      where: { id },
      data: updatePostDto,
      include: {
        createdBy: true,
        receivedLikes: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: { user: true },
        },
      },
    });
    return updatedPost;
  }

  async deleteById(id: string): Promise<string> {
    await PrismaInstance.post.update({
      where: { id },
      data: { deleted: true },
    });
    return `${id} deleted`;
  }

  async updateLikes(id: string, likes: number): Promise<IPost> {
    const updatedPost = await PrismaInstance.post.update({
      where: { id },
      data: { likes },
      include: {
        createdBy: true,
        receivedLikes: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: { user: true },
        },
      },
    });
    return updatedPost;
  }

  async findAllByUserId(userId: string): Promise<IPost[]> {
    const posts = await PrismaInstance.post.findMany({
      where: {
        userId,
        AND: { OR: [{ deleted: false }, { deleted: { isSet: false } }] },
      },
      include: {
        createdBy: true,
        receivedLikes: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: { user: true },
        },
      },
    });
    return posts;
  }
}

export const postRepository = new PostRepository();
