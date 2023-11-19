import { ILoggedUser, IUser } from '@Common/types';
import { CreateUserDto, UpdateUserDto } from '@User/dto';
import { User } from '@prisma/client';

export const createUserDtoMock: CreateUserDto = {
  username: 'rgallardo',
  email: 'rgallardo@test.com',
  password: 'pass',
};

export const userDataMock: User = {
  id: '12345678',
  username: 'rgallardo',
  email: 'rgallardo@test.com',
  password: 'dsfsdkl',
  createdAt: new Date('10/11/2023'),
  deleted: false,
};

export const userJohnDataMock: User = {
  id: '123456780',
  username: 'johnDoe',
  email: 'johndoe@test.com',
  password: 'dsfsdkl',
  createdAt: new Date('10/11/2023'),
  deleted: false,
};

export const loggedUserMock: ILoggedUser = {
  id: '12345678',
  username: 'rgallardo',
};

export const updateUserDtoMock: UpdateUserDto = {
  username: 'johnDoe',
  email: 'johndoe@test.com',
  password: 'pass',
};

export const deletedUserDataMock: IUser = {
  ...userDataMock,
  deleted: true,
};

export const usersArrayDataMock: IUser[] = [userDataMock, userJohnDataMock];
