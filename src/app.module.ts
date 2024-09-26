import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import config from 'ormconfig';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    TypeOrmModule.forRoot(config),
    RateLimiterModule.register({
      points: 10, // 10 requests
      duration: 60, // per 60 seconds by IP
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
