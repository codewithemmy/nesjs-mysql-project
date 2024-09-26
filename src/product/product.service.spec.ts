import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockProductRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('ProductService', () => {
  let service: ProductService;
  let repository: jest.Mocked<Repository<Product>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository(),
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Success scenario: Creating a new product
  it('should create a new product', async () => {
    const product = {
      name: 'Product 1',
      description: 'Sample',
      price: 99.99,
      userId: 'user-uuid',
    };
    repository.save.mockResolvedValue(product as any); // Mock successful save
    const result = await service.create(product);
    expect(result).toEqual(product);
  });

  // Failure scenario: Creating a new product (repository fails)
  it('should fail to create a new product when save fails', async () => {
    const product = {
      name: 'Product 1',
      description: 'Sample',
      price: 99.99,
      userId: 'user-uuid',
    };
    repository.save.mockRejectedValue(new Error('Database error')); // Mock save failure
    await expect(service.create(product)).rejects.toThrow('Database error');
  });

  // Success scenario: Returning all products
  it('should return all products', async () => {
    const products = [
      { name: 'Product 1', description: 'Sample', price: 99.99 },
    ];
    repository.find.mockResolvedValue(products as any); // Mock successful find
    const result = await service.findAll();
    expect(result).toEqual(products);
  });

  // Failure scenario: Returning all products (repository fails)
  it('should fail to return products when find fails', async () => {
    repository.find.mockRejectedValue(new Error('Database error')); // Mock failed find
    await expect(service.findAll()).rejects.toThrow('Database error');
  });

  // Success scenario: Returning a single product
  it('should return a single product', async () => {
    const product = {
      id: '1',
      name: 'Product 1',
      description: 'Sample',
      price: 99.99,
    };
    repository.findOne.mockResolvedValue(product as any); // Mock successful findOne
    const result = await service.findOne('1');
    expect(result).toEqual(product);
  });

  // Failure scenario: Product not found
  it('should throw NotFoundException when product is not found', async () => {
    repository.findOne.mockResolvedValue(null); // Mock not found product
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  // Success scenario: Updating a product
  it('should update a product', async () => {
    const updateProductDto = {
      name: 'Updated Product',
      description: 'Updated Sample',
      price: 199.99,
    };
    repository.update.mockResolvedValue(updateProductDto as any); // Mock successful update
    const result = await service.update('1', updateProductDto);
    expect(result).toBeDefined();
  });

  // Failure scenario: Update fails
  it('should fail to update a product when update fails', async () => {
    const updateProductDto = {
      name: 'Updated Product',
      description: 'Updated Sample',
      price: 199.99,
    };
    repository.update.mockRejectedValue(new Error('Database error')); // Mock failed update
    await expect(service.update('1', updateProductDto)).rejects.toThrow(
      'Database error',
    );
  });

  // Success scenario: Deleting a product
  it('should delete a product', async () => {
    repository.delete.mockResolvedValue({ affected: 1 } as any); // Mock successful delete
    const result = await service.remove('1');
    expect(result.affected).toEqual(1);
  });

  // Failure scenario: Deleting a product fails
  it('should fail to delete a product when delete fails', async () => {
    repository.delete.mockRejectedValue(new Error('Database error')); // Mock failed delete
    await expect(service.remove('1')).rejects.toThrow('Database error');
  });
});
