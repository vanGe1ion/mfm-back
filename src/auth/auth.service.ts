import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import UserSignInDto from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import AccessTokenDto from './dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: UserSignInDto): Promise<AccessTokenDto> {
    const { login, password } = signInDto;
    const user = await this.userService.getUserByLogin(login);

    if (user && user.password === password) {
      const payload = { login, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Uncorrect login or password');
  }
}
