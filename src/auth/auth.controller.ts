import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  // Create an instance of Logger specific to this controller
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    // Log login attempt with the user's email
    this.logger.log(`Login attempt for email: ${loginUserDto.email}`);

    try {
      const result = await this.authService.login(loginUserDto);

      // Log success if login is successful
      this.logger.log(`Login successful for email: ${loginUserDto.email}`);

      return result;
    } catch (error) {
      // Log error if login fails
      this.logger.error(
        `Login failed for email: ${loginUserDto.email}`,
        error.stack,
      );
      throw error; // Rethrow the error after logging it
    }
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    // Log registration attempt with the user's email
    this.logger.log(`Registration attempt for email: ${createUserDto.email}`);

    try {
      const result = await this.userService.create(createUserDto);

      // Log success if registration is successful
      this.logger.log(
        `Registration successful for email: ${createUserDto.email}`,
      );

      return result;
    } catch (error) {
      // Log error if registration fails
      this.logger.error(
        `Registration failed for email: ${createUserDto.email}`,
        error.stack,
      );
      throw error; // Rethrow the error after logging it
    }
  }
}
