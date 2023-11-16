import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class IdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
