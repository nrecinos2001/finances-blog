import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../services/post.service';
import { postRepository } from '@Post/repositories';
import {
  createPostDtoMock,
  postDataMock,
  postDataTwoMock,
  postsArrayDataMock,
  updatePostDtoMock,
} from '@Post/tests/mocks/posts.data.mock';
import { loggedUserMock } from '@User/tests/mocks/user.data.mock';
import { ILoggedUser } from '@Common/types';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('When a new post is created', () => {
      it('should return the created post', async () => {
        jest
          .spyOn(postRepository, 'create')
          .mockResolvedValueOnce(postDataMock);
        const response = service.create(createPostDtoMock, loggedUserMock);
        expect(response).resolves.toEqual(postDataMock);
      });
    });
  });

  describe('findAll', () => {
    describe('When all post are requested', () => {
      it('should return an array of posts or an empty array', async () => {
        jest
          .spyOn(postRepository, 'findAll')
          .mockResolvedValueOnce(postsArrayDataMock);
        const result = service.findAll();
        await expect(result).resolves.toEqual(postsArrayDataMock || []);
      });
    });
  });

  describe('findOne', () => {
    describe('When a post is not found', () => {
      it('should throw a Not Found exception', async () => {
        const id = '123456789';
        jest
          .spyOn(postRepository, 'findOneById')
          .mockResolvedValueOnce(undefined);
        const result = service.findOne(id);
        await expect(result).rejects.toThrow(
          new NotFoundException(`Post with id ${id} was not found`),
        );
      });
    });

    describe('When a post is found', () => {
      it('should return the post', async () => {
        const id = '123456789';
        jest
          .spyOn(postRepository, 'findOneById')
          .mockResolvedValueOnce(postDataMock);
        const result = service.findOne(id);
        await expect(result).resolves.toEqual(postDataMock);
      });
    });
  });

  describe('update', () => {
    describe('When post is not found', () => {
      it('should throw a Not Found Exception', async () => {
        const loggedUser: ILoggedUser = { id: '12345', username: 'user' };
        const id = '123456789';
        jest
          .spyOn(postRepository, 'findOneById')
          .mockResolvedValueOnce(undefined);
        const response = service.update({ id }, updatePostDtoMock, loggedUser);
        await expect(response).rejects.toThrow(
          new NotFoundException(`Post with id ${id} was not found`),
        );
      });
    });

    describe('When logged user is not the owner of the post', () => {
      it('should throw a Forbidden Exception', async () => {
        const loggedUser: ILoggedUser = { id: '12345', username: 'user' };
        jest
          .spyOn(postRepository, 'findOneById')
          .mockResolvedValueOnce(postDataMock);
        const response = service.update(
          { id: '123456789' },
          updatePostDtoMock,
          loggedUser,
        );
        await expect(response).rejects.toThrow(new ForbiddenException());
      });
    });

    describe('When all conditions are met', () => {
      it('should return the updated post', async () => {
        const loggedUser: ILoggedUser = { id: '12345678', username: 'user' };
        jest
          .spyOn(postRepository, 'findOneById')
          .mockResolvedValueOnce(postDataTwoMock);
        jest
          .spyOn(postRepository, 'update')
          .mockResolvedValueOnce(postDataTwoMock);
        const response = service.update(
          { id: '123456789' },
          updatePostDtoMock,
          loggedUser,
        );
        await expect(response).resolves.toEqual(postDataTwoMock);
      });
    });
  });

  describe('remove', () => {
    describe('When logged user is not the owner of the post', () => {
      it('should throw a Forbidden Exception', async () => {
        const loggedUser: ILoggedUser = { id: '12345', username: 'user' };
        jest
          .spyOn(postRepository, 'findOneById')
          .mockResolvedValueOnce(postDataMock);
        const response = service.remove({ id: '123456789' }, loggedUser);
        await expect(response).rejects.toThrow(new ForbiddenException());
      });
    });

    describe('When the post belongs to the logged user', () => {
      it('should return a the deleted message', async () => {
        const loggedUser: ILoggedUser = { id: '12345678', username: 'user' };
        const id = '123456789';
        jest
          .spyOn(postRepository, 'findOneById')
          .mockResolvedValueOnce(postDataMock);
        jest
          .spyOn(postRepository, 'deleteById')
          .mockResolvedValueOnce(`${id} deleted`);
        const response = service.remove({ id }, loggedUser);
        await expect(response).resolves.toEqual(`${id} deleted`);
      });
    });
  });
});
