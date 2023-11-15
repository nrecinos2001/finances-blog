import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { userRepository } from '@User/respositories';
import { UserService } from '@User/services';

import { SignInDto } from '../dtos';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@User/dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const existingUser = await userRepository.findOneByEmail(email);
    if (!existingUser) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: existingUser.id,
      username: existingUser.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }
}
