import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from '@prisma/client';

import { postRepository } from '@Post/repositories';
import { ILoggedUser } from '@Common/types';
import { IdParamDto } from '@Constants/dto';

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

  async update(
    idParamDto: IdParamDto,
    updatePostDto: UpdatePostDto,
    loggedUser: ILoggedUser,
  ) {
    const { id: postId } = idParamDto;
    const existingPost = await this.findOne(postId);

    if (existingPost.userId !== loggedUser.id) {
      throw new ForbiddenException();
    }

    if (updatePostDto?.title) {
      if (updatePostDto.title === existingPost.title) {
        delete updatePostDto.title;
      }
    }

    if (updatePostDto?.description) {
      if (updatePostDto.description === existingPost.description) {
        delete updatePostDto.description;
      }
    }

    const updatedPost = await postRepository.update(postId, updatePostDto);

    return updatePostDto;
  }

  async remove(
    idParamDto: IdParamDto,
    loggedUser: ILoggedUser,
  ): Promise<string> {
    const { id: postId } = idParamDto;
    const existingPost = await this.findOne(postId);
    if (existingPost.userId !== loggedUser.id) {
      throw new ForbiddenException();
    }
    const deletedItem = await postRepository.deleteById(postId);
    return deletedItem;
  }
}
