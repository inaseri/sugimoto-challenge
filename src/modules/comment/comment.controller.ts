import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':productId/')
  fetchByProductId(@Param('productId') productId: string) {
    return this.commentService.fetchByProductId(productId);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateCommentDto, @Req() req: any) {
    return this.commentService.create(dto, req.user.id);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Req() req: any,
  ) {
    return this.commentService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string, @Req() req: any) {
    return this.commentService.delete(id, req.user.id);
  }
}
