import { Module } from '@nestjs/common';

import { PostModule } from '@Post/post.module';

import { CommentsService } from './services';
import { CommentsController } from './controllers';

@Module({
  imports: [PostModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
