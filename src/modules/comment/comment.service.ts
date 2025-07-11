import { SupabaseService } from '../../shared/supabase/services/supabase.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { ProductService } from '../product/services/product.service';

@Injectable()
export class CommentService {
  constructor(
    private supabase: SupabaseService,
    private productService: ProductService,
  ) {}

  async create(dto: CreateCommentDto, userId: string) {
    const product = await this.productService.get(dto.product_id);
    if (!product) throw new NotFoundException('product not found');

    const { data, error } = await this.supabase
      .getClient()
      .from('comments')
      .insert([
        { content: dto.content, product_id: dto.product_id, user_id: userId },
      ])
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async update(id: string, dto: UpdateCommentDto, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('comments')
      .update({ content: dto.content })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .maybeSingle();

    if (error) throw new BadRequestException(error.message);
    if (!data) throw new NotFoundException('Comment not found');
    return data;
  }

  async delete(id: string, userId: string) {
    const { error } = await this.supabase
      .getClient()
      .from('comments')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw new BadRequestException(error.message);
    return { message: 'Comment deleted' };
  }

  async fetchByProductId(productId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('comments')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw new BadRequestException(error.message);
    return data;
  }
}
