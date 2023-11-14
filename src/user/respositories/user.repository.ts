import { CreateUserDto } from '@User/dto/create-user.dto';
import { User } from '@prisma/client';

import { PrismaInstance } from '@Constants/prisma';

import { UpdateUserDto } from '../dto';

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

  async findOneById(id: string): Promise<User> {
    const user = await PrismaInstance.user.findFirst({ where: { id } });
    return user;
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await PrismaInstance.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return updatedUser;
  }

  async delete(id: string): Promise<string> {
    await PrismaInstance.user.update({
      where: { id },
      data: { deleted: true },
    });
    return 'User was deleted';
  }
}

export const userRepository = new UserRepository();
