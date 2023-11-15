import { User } from '@prisma/client';

export const userDataMock: User = {
  id: '12345678',
  username: 'rgallardo',
  email: 'rgallardo@test.com',
  password: 'dsfsdkl',
  createdAt: new Date(),
  deleted: false,
};
