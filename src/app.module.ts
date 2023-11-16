import { Module } from '@nestjs/common';

import { ConfigModuleOptions } from '@Config/config.module';
import { UserModule } from '@User/user.module';
import { AuthModule } from '@Auth/auth.module';
import { PostModule } from '@Post/post.module';

@Module({
  imports: [ConfigModuleOptions, UserModule, AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
