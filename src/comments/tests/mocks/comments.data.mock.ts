import { IComment } from '@Common/types';
import { postDataMock } from '@Post/tests/mocks/posts.data.mock';
import { userDataMock } from '@User/tests/mocks/user.data.mock';

export const commentMock: IComment = {
  id: '1234',
  comment: 'comment',
  userId: '12345678',
  postId: '123456789',
  createdAt: new Date('10/10/2023'),
  user: userDataMock,
  post: postDataMock,
};
