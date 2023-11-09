import { CreateUserDto } from '@User/dto/create-user.dto';
import { User } from '@prisma/client';

import { PrismaInstance } from 'src/constants/prisma';

class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await PrismaInstance.user.findMany();
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await PrismaInstance.user.create({
      data: createUserDto,
    });
    return newUser;
  }
}

export const userRepository = new UserRepository();
