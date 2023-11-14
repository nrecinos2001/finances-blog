import { Module } from '@nestjs/common';

import { ConfigModuleOptions } from '@Config/config.module';
import { UserModule } from '@User/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModuleOptions, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
