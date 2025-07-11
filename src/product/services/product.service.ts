import { SupabaseService } from '../../shared/supabase/services/supabase.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private supabase: SupabaseService) {}

  async create(dto: CreateProductDto) {
    const { title, description, price, additional_data, image_urls } = dto;

    const { data: product, error } = await this.supabase
      .getClient()
      .from('products')
      .insert([{ title, description, price, additional_data }])
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);

    if (image_urls?.length) {
      const images = image_urls.map((url, i) => ({
        product_id: product.id,
        image_url: url,
        position: i,
      }));

      await this.supabase.getClient().from('product_images').insert(images);
    }

    return product;
  }

  async fetch() {
    const { data, error } = await this.supabase
      .getClient()
      .from('products')
      .select('*, product_images(*)');

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async get(productId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('products')
      .select('*, product_images(*)')
      .eq('id', productId)
      .maybeSingle();
    if (error) throw new BadRequestException(error.message);
    if (!data) throw new NotFoundException('product not found');
    return data;
  }

  async delete(productId: string) {
    const { error } = await this.supabase
      .getClient()
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw new Error(error.message);
    return { message: 'Product deleted successfully.' };
  }

  async update(productId: string, updateData: UpdateProductDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('products')
      .update(updateData)
      .eq('id', productId)
      .select()
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) throw new NotFoundException('product not found');
    return data;
  }
}
