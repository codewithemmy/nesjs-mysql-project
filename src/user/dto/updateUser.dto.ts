import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    required: false,
  })
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    required: false,
  })
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email of the user',
    required: false,
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password of the user',
    required: false,
  })
  @IsString()
  @MinLength(6)
  password?: string;
}
