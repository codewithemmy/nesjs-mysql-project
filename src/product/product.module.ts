import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { JwtStrategy } from 'src/auth/jwt-strategy/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, JwtStrategy],
  controllers: [ProductController],
})
export class ProductModule {}
