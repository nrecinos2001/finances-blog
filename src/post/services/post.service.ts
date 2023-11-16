import { Injectable } from '@nestjs/common';

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

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
