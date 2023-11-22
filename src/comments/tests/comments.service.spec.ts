import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../services/comments.service';
import { PostService } from '@Post/services';
import { LikesService } from '@Likes/services';
import { ILoggedUser } from '@Common/types';
import { commentsRepository } from '@Comments/repositories/comments.repository';
import { commentMock } from '@Comments/tests/mocks/comments.data.mock';
import { postDataMock } from '@Post/tests/mocks/posts.data.mock';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('CommentsService', () => {
  let service: CommentsService;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, PostService, LikesService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete', () => {
    describe('When a comment is not found', () => {
      it('should throw a Not Found Exception', async () => {
        const loggedUser: ILoggedUser = {
          id: '12',
          username: 'username',
        };
        const idParamDto = { id: '1234' };
        jest
          .spyOn(commentsRepository, 'findOne')
          .mockResolvedValueOnce(undefined);
        const response = service.delete(idParamDto, loggedUser);
        await expect(response).rejects.toEqual(
          new NotFoundException(
            `Comment with id ${idParamDto.id} was not found`,
          ),
        );
      });
    });

    describe('When logged user is not the owner of the comment, nor the post', () => {
      it('should throw a Forbidden Exception', async () => {
        const loggedUser: ILoggedUser = {
          id: '12',
          username: 'username',
        };
        jest
          .spyOn(commentsRepository, 'findOne')
          .mockResolvedValueOnce(commentMock);
        const response = service.delete({ id: '1234' }, loggedUser);
        await expect(response).rejects.toThrow(new ForbiddenException());
      });
    });

    describe('When logged user is the owner of the comment, or the post', () => {
      it('should return the post without the comment', async () => {
        const loggedUser: ILoggedUser = {
          id: '12345678',
          username: 'username',
        };
        jest
          .spyOn(commentsRepository, 'findOne')
          .mockResolvedValueOnce(commentMock);
        jest
          .spyOn(commentsRepository, 'deleteById')
          .mockResolvedValueOnce(undefined);
        jest
          .spyOn(postService, 'findOne')
          .mockResolvedValueOnce({ ...postDataMock, comments: [] });
        const response = service.delete({ id: '1234' }, loggedUser);
        await expect(response).resolves.toEqual({
          ...postDataMock,
          comments: [],
        });
      });
    });
  });
});
