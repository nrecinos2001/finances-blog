import { SignInDto } from '@Auth/dtos';
import { AuthService } from '@Auth/services';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    description: 'Sign in',
    summary: 'Use it to sign in',
  })
  @Post('sign-in')
  async signIn(@Body() signinDto: SignInDto) {
    return await this.authService.signin(signinDto);
  }
}
