import { Module } from '@nestjs/common';

import { ConfigModuleOptions } from '@Config/config.module';

@Module({
  imports: [ConfigModuleOptions],
  controllers: [],
  providers: [],
})
export class AppModule {}
