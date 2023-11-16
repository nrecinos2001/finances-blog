import { Module } from '@nestjs/common';

import { ConfigModuleOptions } from '@Config/config.module';
import { UserModule } from '@User/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModuleOptions, UserModule, AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
