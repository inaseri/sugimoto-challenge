import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  fetch() {
    return this.productService.fetch();
  }

  @Get(':productId')
  get(@Param('productId') productId: string) {
    return this.productService.get(productId);
  }

  @Put(':productId')
  update(@Param('productId') productId: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(productId, dto);
  }

  @Delete(':productId')
  delete(@Param('productId') productId: string) {
    return this.productService.delete(productId);
  }
}
