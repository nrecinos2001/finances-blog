import { Module } from '@nestjs/common';

import { ConfigModuleOptions } from '@Config/config.module';
import { UserModule } from '@User/user.module';

@Module({
  imports: [ConfigModuleOptions, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
