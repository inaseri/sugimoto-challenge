import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SupabaseModule } from '../../shared/supabase/supabase.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [SupabaseModule, ProductModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
