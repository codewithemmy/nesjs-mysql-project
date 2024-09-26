import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity'; // Ensure this points to your User entity
import { JwtStrategy } from 'src/auth/jwt-strategy/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register the User entity
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService], // Export UserService if it needs to be used in other modules
})
export class UserModule {}
