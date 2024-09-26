import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: Partial<User>) {
    const result = await this.usersService.findOneWithUserName(user.email); // Find user by email
    if (result && (await bcrypt.compare(user.password, result.password))) {
      // Validate password
      const { password, ...rest } = result;
      const payload = {
        email: user.email,
        admin: user.role,
      };
      return {
        ...rest,
        accessToken: this.jwtService.sign(payload),
      };
    }

    return null;
  }
}
