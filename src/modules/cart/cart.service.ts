import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../shared/supabase/services/supabase.service';
import { CreateCartItemDto, UpdateCartItemDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly supabase: SupabaseService) {}

  async fetch(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('cart_items')
      .select('*, products(title, price)')
      .eq('user_id', userId);

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async add(dto: CreateCartItemDto, userId: string) {
    const { data: existing } = await this.supabase
      .getClient()
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', dto.product_id)
      .single();

    if (existing) {
      const { data, error } = await this.supabase
        .getClient()
        .from('cart_items')
        .update({ quantity: existing.quantity + dto.quantity })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw new BadRequestException(error.message);
      return data;
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('cart_items')
      .insert([{ ...dto, user_id: userId }])
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async update(id: string, dto: UpdateCartItemDto, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('cart_items')
      .update({ quantity: dto.quantity })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .maybeSingle();

    if (!data) throw new NotFoundException('Cart not found');
    if (error) throw new BadRequestException(error.message);

    return data;
  }

  async remove(id: string, userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('cart_items')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw new BadRequestException(error.message);
    if (!data) throw new NotFoundException('Cart not found');

    return { message: 'Item removed from cart' };
  }
}
