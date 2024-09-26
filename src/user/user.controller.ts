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
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/auth-guard/jwt.auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Roles } from 'src/auth/roles-guard/roles.decorator';

@ApiBearerAuth('access-token') // Apply JWT Bearer auth (if you're using JWT)
@ApiTags('users') // Tag this controller under 'users' in Swagger
@UseGuards(JwtGuard) // Apply JwtGuard globally for all routes
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name); // Logger instance for UserController

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' }) // Adds summary for Swagger
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Log the attempt to create a new user
    this.logger.log(`Creating a new user with email: ${createUserDto.email}`);

    try {
      const result = await this.userService.create(createUserDto);
      this.logger.log(
        `User created successfully with email: ${createUserDto.email}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to create user with email: ${createUserDto.email}`,
        error.stack,
      );
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @Get()
  async findAll() {
    this.logger.log('Fetching all users');
    try {
      return await this.userService.findAll();
    } catch (error) {
      this.logger.error('Failed to fetch users', error.stack);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Return user details.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Fetching user with ID: ${id}`);

    try {
      const user = await this.userService.findOne(id);
      if (user) {
        this.logger.log(`User found with ID: ${id}`);
        return user;
      } else {
        this.logger.warn(`User not found with ID: ${id}`);
        return { message: 'User not found' };
      }
    } catch (error) {
      this.logger.error(`Failed to fetch user with ID: ${id}`, error.stack);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user with ID: ${id}`);

    try {
      const result = await this.userService.update(id, updateUserDto);
      this.logger.log(`User updated successfully with ID: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to update user with ID: ${id}`, error.stack);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  @Roles('admin') // Only allow admins to delete users
  async remove(@Param('id') id: string) {
    this.logger.log(`Attempting to delete user with ID: ${id}`);

    try {
      const result = await this.userService.remove(id);
      if (result) {
        this.logger.log(`User deleted successfully with ID: ${id}`);
      } else {
        this.logger.warn(`User not found for deletion with ID: ${id}`);
      }
      return result;
    } catch (error) {
      this.logger.error(`Failed to delete user with ID: ${id}`, error.stack);
      throw error;
    }
  }
}
