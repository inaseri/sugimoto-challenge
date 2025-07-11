import { IsUUID, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  product_id: string;

  @IsInt()
  @Min(1)
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}
