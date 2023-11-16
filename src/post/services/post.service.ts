import { Injectable, NotFoundException } from '@nestjs/common';

import { postRepository } from '@Post/repositories';
import { ILoggedUser } from '@Common/types';
import { Post } from '@prisma/client';

import { CreatePostDto, UpdatePostDto } from '../dto';

@Injectable()
export class PostService {
  async create(
    createPostDto: CreatePostDto,
    loggedUser: ILoggedUser,
  ): Promise<Post> {
    const newPost = await postRepository.create(createPostDto, loggedUser.id);
    return newPost;
  }

  async findAll() {
    return await postRepository.findAll();
  }

  async findOne(id: string) {
    const post = await postRepository.findOneById(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} was not found`);
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
