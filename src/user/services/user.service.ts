import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

import envVariables from '@Config/env-variables';
import { userRepository } from '@User/respositories';

import { UpdateUserDto, CreateUserDto } from '../dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const { jwt } = envVariables();
    const newPassword = await bcrypt.hash(password, Number(jwt.salt));
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
