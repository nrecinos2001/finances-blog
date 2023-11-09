import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import envVariables from '@Config/env-variables';
import { userRepository } from '@User/respositories';

import { UpdateUserDto, CreateUserDto } from '../dto';
import { User } from '@prisma/client';

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
