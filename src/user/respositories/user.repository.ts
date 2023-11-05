import { CreateUserDto } from '@User/dto/create-user.dto';
import { User } from '@prisma/client';

import { PrismaInstance } from 'src/constants/prisma';

class UserRepository {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await PrismaInstance.user.create({
      data: createUserDto,
    });
    return newUser;
    /* //PrismaInstance.$connect();
    return await PrismaInstance.user.findFirst();
    return; */
  }
}

export const userRepository = new UserRepository();
