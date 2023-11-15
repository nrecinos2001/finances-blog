import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../services/auth.service';
import { UserService } from '@User/services';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '@Auth/dtos';
import { UnauthorizedException } from '@nestjs/common';
import { userRepository } from '@User/respositories';
import { userDataMock } from '@User/tests/mocks/user.data.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signin', () => {
    describe('When user is not found with credentials', () => {
      it('should throw an Unauthorized exception', async () => {
        const signInBody: SignInDto = {
          email: 'test@gmail.com',
          password: 'pass',
        };
        jest
          .spyOn(userRepository, 'findOneByEmail')
          .mockResolvedValueOnce(undefined);
        const response = service.signin(signInBody);
        await expect(response).rejects.toThrow(new UnauthorizedException());
      });
    });

    describe('When password is not valid', () => {
      it('should throw an Unauthorized exception', async () => {
        const signInBody: SignInDto = {
          email: 'test@gmail.com',
          password: 'pass',
        };
        jest
          .spyOn(userRepository, 'findOneByEmail')
          .mockResolvedValueOnce(userDataMock);
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
        const response = service.signin(signInBody);
        await expect(response).rejects.toThrow(new UnauthorizedException());
      });
    });

    describe('When credentials are valid', () => {
      it('should return an access_token', async () => {
        const signInBody: SignInDto = {
          email: 'test@gmail.com',
          password: 'pass',
        };
        const tokenMock =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDgyOGY5YjNhMjZjMGM4MGE0MmQyOCIsInVzZXJuYW1lIjoic3RyaW5nIiwiaWF0IjoxNzAwMDE2NTI4LCJleHAiOjE3MDAxMzY1Mjh9.Mhw9Ydd_-TPFnecpzleKDBb7GKj6F3v9MkTynY9gPoE';
        jest
          .spyOn(userRepository, 'findOneByEmail')
          .mockResolvedValueOnce(userDataMock);
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
        jest.spyOn(jwtService, 'sign').mockReturnValueOnce(tokenMock);
        const response = service.signin(signInBody);
        await expect(response).resolves.toEqual({
          access_token: tokenMock,
        });
      });
    });
  });
});
