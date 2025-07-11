import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './shared/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    SupabaseModule,
    AuthModule,
    ProductModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
