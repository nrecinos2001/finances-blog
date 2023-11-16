import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { userRepository } from '@User/respositories';
import { encryptPassword } from '@Common/utils';

import { UpdateUserDto, CreateUserDto } from '../dto';
import { ILoggedUser } from '@Common/types';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const { password, email, username } = createUserDto;
    const exististByEmail = await userRepository.findOneByEmail(email);
    if (exististByEmail) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    const exististByUsername = await userRepository.findOneByUsername(username);
    if (exististByUsername) {
      throw new ConflictException(
        `User with username ${username} already exists`,
      );
    }

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
    await this.findOne(id);
    if (updateUserDto?.password) {
      updateUserDto.password = await encryptPassword(updateUserDto.password);
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
