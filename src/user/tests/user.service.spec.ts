import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import {
  createUserDtoMock,
  deletedUserDataMock,
  loggedUserMock,
  updateUserDtoMock,
  userDataMock,
  userJohnDataMock,
  usersArrayDataMock,
} from '@User/tests/mocks/user.data.mock';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { userRepository } from '@User/respositories';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('When a new user contains an existing email', () => {
      it('should throw a ForbiddenException', async () => {
        jest
          .spyOn(userRepository, 'findOneByEmail')
          .mockResolvedValueOnce(userDataMock);
        const response = service.create(createUserDtoMock);
        await expect(response).rejects.toThrow(
          new ConflictException(
            `User with email ${createUserDtoMock.email} already exists`,
          ),
        );
      });
    });

    describe('When a new user contains an existing username', () => {
      it('should throw a ForbiddenException', async () => {
        jest
          .spyOn(userRepository, 'findOneByEmail')
          .mockResolvedValueOnce(undefined);
        jest
          .spyOn(userRepository, 'findOneByUsername')
          .mockResolvedValueOnce(userDataMock);
        const response = service.create({
          ...createUserDtoMock,
          email: 'user@new.com',
        });
        await expect(response).rejects.toThrow(
          new ConflictException(
            `User with username ${createUserDtoMock.username} already exists`,
          ),
        );
      });
    });

    describe('When a new user payload is correct', () => {
      it('should return the new user', async () => {
        jest
          .spyOn(userRepository, 'findOneByEmail')
          .mockResolvedValueOnce(undefined);
        jest
          .spyOn(userRepository, 'findOneByUsername')
          .mockResolvedValueOnce(undefined);
        jest
          .spyOn(userRepository, 'create')
          .mockResolvedValueOnce(userDataMock);
        const response = service.create({
          ...createUserDtoMock,
        });
        await expect(response).resolves.toEqual(userDataMock);
      });
    });
  });

  describe('findAll', () => {
    describe('When users exists', () => {
      it('should return an array of users or empty', async () => {
        jest
          .spyOn(userRepository, 'findAll')
          .mockResolvedValueOnce(usersArrayDataMock);
        const response = service.findAll();
        await expect(response).resolves.toEqual(usersArrayDataMock || []);
      });
    });
  });

  describe('finOne', () => {
    describe('When a user is not found by id', () => {
      it('should throw a Not Found Exception', async () => {
        const id = '123456788';
        jest
          .spyOn(userRepository, 'findOneById')
          .mockResolvedValueOnce(undefined);
        const response = service.findOne(id);
        await expect(response).rejects.toThrow(
          new NotFoundException(`User with id ${id} was not found`),
        );
      });
    });

    describe('When a user is found', () => {
      it('should return the user', async () => {
        const id = '12345678';
        jest
          .spyOn(userRepository, 'findOneById')
          .mockResolvedValueOnce(userDataMock);
        const response = service.findOne(id);
        await expect(response).resolves.toEqual(userDataMock);
      });
    });
  });

  describe('update', () => {
    describe('When the user to update is not the same logged', () => {
      it('should return a Forbidden exception', async () => {
        const id = '123456789';
        const response = service.update(id, updateUserDtoMock, loggedUserMock);
        await expect(response).rejects.toThrow(new ForbiddenException());
      });
    });

    describe('When the fields are correct', () => {
      it('should return an updated element', async () => {
        const id = '12345678';
        jest
          .spyOn(userRepository, 'findOneById')
          .mockResolvedValue(userDataMock);
        jest
          .spyOn(userRepository, 'findOneByEmail')
          .mockResolvedValueOnce(undefined);
        jest
          .spyOn(userRepository, 'findOneByUsername')
          .mockResolvedValueOnce(undefined);
        jest
          .spyOn(userRepository, 'updateOne')
          .mockResolvedValueOnce(userJohnDataMock);
        const response = service.update(id, updateUserDtoMock, loggedUserMock);
        await expect(response).resolves.toEqual(userJohnDataMock);
      });
    });
  });

  describe('remove', () => {
    describe('When the user to delete is not the same logged', () => {
      it('should return a Forbidden exception', async () => {
        const id = '123456789';
        const response = service.remove(id, loggedUserMock);
        await expect(response).rejects.toThrow(new ForbiddenException());
      });
    });

    describe('When the user is already deleted', () => {
      it('throw a Not Found exception', async () => {
        const id = '12345678';
        jest.spyOn(service, 'findOne').mockResolvedValue(deletedUserDataMock);
        const response = service.remove(id, loggedUserMock);
        await expect(response).rejects.toThrow(
          new NotFoundException(`User with id ${id} does not exist`),
        );
      });
    });

    describe('When the user is not deleted', () => {
      it('return a message about deleted id', async () => {
        const id = '12345678';
        jest.spyOn(service, 'findOne').mockResolvedValue(userDataMock);
        jest
          .spyOn(userRepository, 'delete')
          .mockResolvedValueOnce('User was deleted');
        const response = service.remove(id, loggedUserMock);
        await expect(response).resolves.toEqual('User was deleted');
      });
    });
  });
});
