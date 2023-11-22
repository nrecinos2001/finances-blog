import { Module } from '@nestjs/common';

import { PostService } from './services';
import { PostController } from './controllers';
import { LikesModule } from '@Likes/likes.module';

@Module({
  imports: [LikesModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
