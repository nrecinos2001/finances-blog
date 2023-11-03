import { Module } from '@nestjs/common';

import { ConfigModuleOptions } from '@Config/config.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModuleOptions],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
