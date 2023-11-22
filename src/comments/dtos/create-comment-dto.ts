import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  comment: string;
}
