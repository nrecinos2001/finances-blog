import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { postRepository } from '@Post/repositories';
import { ILoggedUser, IPost } from '@Common/types';
import { IdParamDto } from '@Constants/dto';
import { LikesService } from '@Likes/services';

import { CreatePostDto, UpdatePostDto } from '../dto';

@Injectable()
export class PostService {
  constructor(private readonly likesService: LikesService) {}
  async create(
    createPostDto: CreatePostDto,
    loggedUser: ILoggedUser,
  ): Promise<IPost> {
    const newPost = await postRepository.create(createPostDto, loggedUser.id);
    return newPost;
  }

  async findAll(): Promise<IPost[]> {
    return await postRepository.findAll();
  }

  async findOne(id: string): Promise<IPost> {
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
  ): Promise<IPost> {
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

    return updatedPost;
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

  async addOrDeleteLike(loggedUser: ILoggedUser, postId: string) {
    await this.findOne(postId);
    const updatedLike = await this.likesService.addOrRemoveLike({
      postId,
      userId: loggedUser.id,
    });
    return updatedLike;
  }

  async findAllByUserId(userId: string): Promise<IPost[]> {
    return await postRepository.findAllByUserId(userId);
  }
}
