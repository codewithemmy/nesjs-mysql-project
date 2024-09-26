import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/auth-guard/jwt.auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Roles } from 'src/auth/roles-guard/roles.decorator';

@ApiBearerAuth('access-token')
@ApiTags('products') // Tag this controller under 'products' in Swagger
@UseGuards(JwtGuard) // Apply JwtGuard globally for all routes
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name); // Logger instance for ProductController

  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' }) // Adds summary for Swagger
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    // Log the attempt to create a new product
    this.logger.log(`Creating a new product: ${createProductDto.name}`);

    try {
      const result = await this.productService.create(createProductDto);
      this.logger.log(`Product created successfully: ${createProductDto.name}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to create product: ${createProductDto.name}`,
        error.stack,
      );
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  @Get()
  async findAll() {
    this.logger.log('Fetching all products');
    try {
      return await this.productService.findAll();
    } catch (error) {
      this.logger.error('Failed to fetch products', error.stack);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Return product details.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Fetching product with ID: ${id}`);

    try {
      const product = await this.productService.findOne(id);
      if (product) {
        this.logger.log(`Product found with ID: ${id}`);
        return product;
      } else {
        this.logger.warn(`Product not found with ID: ${id}`);
        return { message: 'Product not found' };
      }
    } catch (error) {
      this.logger.error(`Failed to fetch product with ID: ${id}`, error.stack);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.logger.log(`Updating product with ID: ${id}`);

    try {
      const result = await this.productService.update(id, updateProductDto);
      this.logger.log(`Product updated successfully with ID: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update product with ID: ${id}`, error.stack);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @Delete(':id')
  @Roles('admin') // Only allow admins to delete products
  async remove(@Param('id') id: string) {
    this.logger.log(`Attempting to delete product with ID: ${id}`);

    try {
      const result = await this.productService.remove(id);
      if (result) {
        this.logger.log(`Product deleted successfully with ID: ${id}`);
      } else {
        this.logger.warn(`Product not found for deletion with ID: ${id}`);
      }
      return result;
    } catch (error) {
      this.logger.error(`Failed to delete product with ID: ${id}`, error.stack);
      throw error;
    }
  }
}
