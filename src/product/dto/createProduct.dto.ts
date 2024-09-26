import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A brief description of the product',
    description: 'The product description',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 99.99, description: 'The price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 100,
    description: 'The available quantity of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
