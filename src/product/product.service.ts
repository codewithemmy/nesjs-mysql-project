import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: Partial<Product>) {
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  update(id: string, updateProduct: Partial<Product>) {
    return this.productRepository.update(id, updateProduct);
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
