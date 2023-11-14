import { Module } from '@nestjs/common';

import { UserModule } from '@User/user.module';

import { AuthService } from './services';
import { AuthController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import envVariables from '@Config/env-variables';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: envVariables().jwt.key,
      signOptions: { expiresIn: '120000s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
