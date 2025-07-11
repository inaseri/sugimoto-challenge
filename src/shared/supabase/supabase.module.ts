import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupabaseService } from './services/supabase.service';
import { SupabaseAdminService } from './services/supabase-admin.service';

@Module({
  imports: [HttpModule],
  providers: [SupabaseService, SupabaseAdminService],
  exports: [SupabaseService, SupabaseAdminService],
})
export class SupabaseModule {}
