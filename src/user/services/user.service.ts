import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { userRepository } from '@User/respositories';
import { encryptPassword } from '@Common/utils';
import { ILoggedUser } from '@Common/types';

import { UpdateUserDto, CreateUserDto } from '../dto';

@Injectable()
export class UserService {
  async validateEmail(email: string): Promise<User> {
    const exististByEmail = await userRepository.findOneByEmail(email);
    if (exististByEmail) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    return exististByEmail;
  }

  async validateUsername(username: string): Promise<User> {
    const existingByUsername = await userRepository.findOneByUsername(username);
    if (existingByUsername) {
      throw new ConflictException(
        `User with username ${username} already exists`,
      );
    }
    return existingByUsername;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, email, username } = createUserDto;
    // Validate email and username
    await this.validateEmail(email);
    await this.validateUsername(username);

    const newPassword = await encryptPassword(password);
    createUserDto.password = newPassword;

    const newUser = await userRepository.create(createUserDto);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = await userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    loggedUser: ILoggedUser,
  ) {
    // Validate existing user
    if (loggedUser.id !== id) throw new ForbiddenException();
    const currentUser = await this.findOne(id);
    if (updateUserDto?.password) {
      updateUserDto.password = await encryptPassword(updateUserDto.password);
    }
    if (updateUserDto?.email) {
      if (currentUser.email !== updateUserDto.email) {
        await this.validateEmail(updateUserDto.email);
      }
    }
    if (updateUserDto?.username) {
      if (currentUser.username !== updateUserDto.username) {
        await this.validateUsername(updateUserDto.username);
      }
    }
    const updatedUser = await userRepository.updateOne(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: string, loggedUser: ILoggedUser) {
    if (loggedUser.id !== id) throw new ForbiddenException();
    // Validate if exists
    const existingUser = await this.findOne(id);
    if (existingUser.deleted) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return await userRepository.delete(id);
  }
}
