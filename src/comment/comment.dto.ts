import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsUUID()
  @ApiProperty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
