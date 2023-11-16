import { Module } from '@nestjs/common';

import { PostService } from './services';
import { PostController } from './controllers';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
