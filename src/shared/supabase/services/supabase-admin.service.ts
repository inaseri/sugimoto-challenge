import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SupabaseAdminService {
  private readonly baseUrl = process.env.SUPABASE_URL;
  private readonly serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  constructor(private readonly httpService: HttpService) {}

  async findUserByEmail(email: string): Promise<any | null> {
    const url = `${this.baseUrl}/auth/v1/admin/users`;
    const headers = {
      Authorization: `Bearer ${this.serviceKey}`,
      apikey: this.serviceKey,
    };

    const { data } = await firstValueFrom(
      this.httpService.get(url, {
        headers,
        params: {
          filter: `email.eq.${email}`,
        },
      }),
    );

    return data.users.length > 0;
  }
}
