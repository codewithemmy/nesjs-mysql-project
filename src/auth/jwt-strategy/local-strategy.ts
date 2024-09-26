// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from '../auth.service';
// import { Injectable, UnauthorizedException } from '@nestjs/common';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   async validate(email: string, password: string) {
//     console.log("this is working fine")
//     const user = await this.authService.validateUser(email, password);
//     console.log('this is working fine', user);

//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
