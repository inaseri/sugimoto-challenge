import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseService } from '../../shared/supabase/services/supabase.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}

  async signup(dto: AuthDto) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.signUp({ email: dto.email, password: dto.password });

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async login(dto: AuthDto) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.signInWithPassword({ email: dto.email, password: dto.password });
    if (error) throw new BadRequestException(error.message);

    const authenticated = data.session;
    delete authenticated.user;
    return authenticated;
  }
}
