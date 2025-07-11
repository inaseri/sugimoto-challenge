import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDetail {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  @IsUrl({}, { each: true })
  image_urls?: string[];

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({ isArray: true, type: ProductDetail })
  additional_data?: ProductDetail[];
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  image_urls?: string[];

  @IsObject()
  @IsOptional()
  additional_data?: Record<string, any>;
}
