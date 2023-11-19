import { IPost } from '@Common/types';
import { CreatePostDto, UpdatePostDto } from '@Post/dto';
import { userDataMock } from '@User/tests/mocks/user.data.mock';

export const postDataMock: IPost = {
  id: '123456789',
  title: 'Post about people',
  description: 'I think people are great!',
  likes: 0,
  userId: '12345678',
  createdAt: new Date('10/10/2023'),
  createdBy: userDataMock,
};

export const postDataTwoMock: IPost = {
  id: '1234567890',
  title: 'Post about animals',
  description: 'I think animals are great!',
  likes: 0,
  userId: '12345678',
  createdAt: new Date('10/10/2023'),
  createdBy: userDataMock,
};

export const postsArrayDataMock: IPost[] = [postDataMock, postDataTwoMock];

export const createPostDtoMock: CreatePostDto = {
  title: 'Post about people',
  description: 'I think people are great!',
};

export const updatePostDtoMock: UpdatePostDto = {
  title: 'Post about animals',
  description: 'I think animals are great!',
};
