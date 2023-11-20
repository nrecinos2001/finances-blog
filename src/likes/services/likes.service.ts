import { Injectable } from '@nestjs/common';

import { CreateLikesDto } from '@Likes/dto';
import { likesRepository } from '@Likes/repositories';
import { postRepository } from '@Post/repositories';

@Injectable()
export class LikesService {
  async addOrRemoveLike(createLikesDto: CreateLikesDto) {
    const { userId, postId } = createLikesDto;
    const existingLike = await likesRepository.findOneByPostAndUser(
      userId,
      postId,
    );
    if (!existingLike) {
      const createdLike = await likesRepository.create(createLikesDto);
      const postLikes = createdLike.post.likes + 1;
      const updatedPost = await postRepository.updateLikes(postId, postLikes);
      return updatedPost;
    }

    const postLikes =
      existingLike.post.likes === 0 ? 0 : existingLike.post.likes - 1;
    // Delete like
    await likesRepository.delete(existingLike.id);
    const updatedPost = await postRepository.updateLikes(postId, postLikes);
    return updatedPost;
  }
}
