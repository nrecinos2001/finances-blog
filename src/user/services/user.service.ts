import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

  findAll() {
    return `This action returns all user`;
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
