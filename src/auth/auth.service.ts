import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async login(signInDto: UserSignInDto): Promise<AccessTokenDto> {
    const { login, password } = signInDto;
    const user = await this.userService.getUserByLogin(login);

    if(!user)
      throw new NotFoundException('User with such login was not found');
    else if (user.password === password) {
      const payload = { login, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid password');
  }
}
