import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'A brief description of the product',
    description: 'The product description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 99.99,
    description: 'The price of the product',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 100,
    description: 'The available quantity of the product',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
