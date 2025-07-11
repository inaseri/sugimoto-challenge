import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { RequestWithUser } from '../../shared/types/request';
import { CreateCartItemDto, UpdateCartItemDto } from './cart.dto';

@Controller('cart')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  fetch(@Req() req: RequestWithUser) {
    return this.cartService.fetch(req.user.id);
  }

  @Post()
  add(@Body() dto: CreateCartItemDto, @Req() req: RequestWithUser) {
    return this.cartService.add(dto, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCartItemDto,
    @Req() req: RequestWithUser,
  ) {
    return this.cartService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.cartService.remove(id, req.user.id);
  }
}
