import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../shared/supabase/services/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    const { data, error } = await this.supabase.getClient().auth.getUser(token);

    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = data.user;
    return true;
  }
}
