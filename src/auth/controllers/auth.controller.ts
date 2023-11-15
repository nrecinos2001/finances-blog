import { SignInDto } from '@Auth/dtos';
import { AuthService } from '@Auth/services';
import { CreateUserDto } from '@User/dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Log in',
    summary: 'Use it to log in',
  })
  @Post('log-in')
  async signIn(@Body() signinDto: SignInDto) {
    return await this.authService.signin(signinDto);
  }

  @ApiOperation({
    description: 'Register a new user',
    summary: 'Use it to register a new user',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
