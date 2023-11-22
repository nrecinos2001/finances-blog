import { Module } from '@nestjs/common';

import { LikesService } from './services';

@Module({
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
