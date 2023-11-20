import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateLikesDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  postId: string;
}
